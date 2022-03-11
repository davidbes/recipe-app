import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Profile } from 'models/Profile/Profile.model';

export const fetchProfile = createAsyncThunk<
	Profile | { message: string },
	string
>('profile/fetchProfile', async (id, thunkAPI) => {
	const { REACT_APP_SERVER_URL } = process.env;
	try {
		const token = localStorage.getItem('token');
		const response = await fetch(REACT_APP_SERVER_URL + '/api/profile/' + id, {
			method: 'GET',
			headers: {
				Accept: 'application/json',
				Authorization: token || '',
				'Content-Type': 'application/json',
			},
		});
		const data = await response.json();
		return response.status === 200 ? data : thunkAPI.rejectWithValue(data);
	} catch (e) {
		return thunkAPI.rejectWithValue({
			message: 'An error occured!',
		});
	}
});

interface GetProfileState {
	isLoading: boolean;
	profile: Profile | null;
	error: {
		message: string;
	} | null;
}

const initialState = {
	isLoading: false,
	profile: null,
	error: null,
} as GetProfileState;

const getProfileSlice = createSlice({
	name: 'get profile',
	initialState,
	reducers: {
		clearProfile: (state): void => {
			state.profile = null;
		},
	},
	extraReducers: (builder): void => {
		builder.addCase(fetchProfile.fulfilled, (state, { payload }) => {
			state.profile = payload as Profile;
			state.isLoading = false;
		});
		builder.addCase(fetchProfile.pending, (state) => {
			state.isLoading = true;
		});
		builder.addCase(fetchProfile.rejected, (state, action) => {
			state.isLoading = false;
			state.error = action.payload as { message: string };
		});
	},
});

export const { clearProfile } = getProfileSlice.actions;

export default getProfileSlice.reducer;
