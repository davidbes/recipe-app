import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Recipe } from 'models/Recipe/Recipe.model';

type IngredientsFound = {
	_id: string;
	name: string;
};

export const fetchIngredients = createAsyncThunk<
	IngredientsFound[] | { message: string },
	string
>('search ingredients', async (searchQuery, thunkAPI) => {
	const { REACT_APP_SERVER_URL } = process.env;
	try {
		const token = localStorage.getItem('token');
		const response = await fetch(
			REACT_APP_SERVER_URL + '/api/ingredients?search=' + searchQuery,
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

interface SearchIngredientsState {
	isLoading: boolean;
	ingredients: IngredientsFound[];
	error: {
		message: string;
	} | null;
}

const initialState = {
	isLoading: false,
	ingredients: [],
	error: null,
} as SearchIngredientsState;

const searchIngredientsSlice = createSlice({
	name: 'search badges by query',
	initialState,
	reducers: {
		clearIngredients: (state): void => {
			state.ingredients = [];
		},
	},
	extraReducers: (builder): void => {
		builder.addCase(fetchIngredients.fulfilled, (state, { payload }) => {
			state.ingredients = payload as IngredientsFound[];
			state.isLoading = false;
		});
		builder.addCase(fetchIngredients.pending, (state) => {
			state.isLoading = true;
		});
		builder.addCase(fetchIngredients.rejected, (state, action) => {
			state.isLoading = false;
			state.error = action.payload as { message: string };
		});
	},
});

export const { clearIngredients } = searchIngredientsSlice.actions;

export default searchIngredientsSlice.reducer;
