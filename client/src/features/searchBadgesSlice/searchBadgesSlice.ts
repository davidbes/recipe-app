import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Recipe } from 'models/Recipe/Recipe.model';

type BadgeFound = {
	name: string;
	image: string;
	description: string;
	_id: string;
};

export const fetchBadges = createAsyncThunk<
	BadgeFound[] | { message: string },
	string
>('search badge', async (searchQuery, thunkAPI) => {
	const { REACT_APP_SERVER_URL } = process.env;
	try {
		const token = localStorage.getItem('token');
		const response = await fetch(
			REACT_APP_SERVER_URL + '/api/badges?search=' + searchQuery,
			{
				method: 'GET',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
			}
		);
		const data = await response.json();
		return response.status === 200 ? data : thunkAPI.rejectWithValue(data);
	} catch (e) {
		return thunkAPI.rejectWithValue({
			message: 'An error occured!',
		});
	}
});

interface SearchBadgesState {
	isLoading: boolean;
	badges: BadgeFound[];
	error: {
		message: string;
	} | null;
}

const initialState = {
	isLoading: false,
	badges: [],
	error: null,
} as SearchBadgesState;

const searchBadgesSlice = createSlice({
	name: 'search badges by query',
	initialState,
	reducers: {
		clearBadges: (state): void => {
			state.badges = [];
		},
	},
	extraReducers: (builder): void => {
		builder.addCase(fetchBadges.fulfilled, (state, { payload }) => {
			state.badges = payload as BadgeFound[];
			state.isLoading = false;
		});
		builder.addCase(fetchBadges.pending, (state) => {
			state.isLoading = true;
		});
		builder.addCase(fetchBadges.rejected, (state, action) => {
			state.isLoading = false;
			state.error = action.payload as { message: string };
		});
	},
});

export const { clearBadges } = searchBadgesSlice.actions;

export default searchBadgesSlice.reducer;
