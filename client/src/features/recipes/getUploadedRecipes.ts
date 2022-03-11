import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RecipeListItem } from 'models/Recipe/RecipeListItem.model';

export const fetchUploadedRecipes = createAsyncThunk<
	RecipeListItem[] | { message: string },
	string
>('recipes/fetchUploadedRecipes', async (id, thunkAPI) => {
	const { REACT_APP_SERVER_URL } = process.env;
	try {
		const token = localStorage.getItem('token');
		const response = await fetch(
			REACT_APP_SERVER_URL + '/api/profile/' + id + '/uploaded',
			{
				method: 'GET',
				headers: {
					Accept: 'application/json',
					Authorization: token || '',
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

interface GetUploadedRecipesState {
	isLoading: boolean;
	recipes: RecipeListItem[];
	error: {
		message: string;
	} | null;
}

const initialState = {
	isLoading: false,
	recipes: [],
	error: null,
} as GetUploadedRecipesState;

const getUploadedRecipes = createSlice({
	name: 'get uploaded recipes',
	initialState,
	reducers: {
		clearUploadedRecipes: (state): void => {
			state.recipes = [];
		},
	},
	extraReducers: (builder): void => {
		builder.addCase(fetchUploadedRecipes.fulfilled, (state, { payload }) => {
			state.recipes = payload as RecipeListItem[];
			state.isLoading = false;
		});
		builder.addCase(fetchUploadedRecipes.pending, (state) => {
			state.isLoading = true;
		});
		builder.addCase(fetchUploadedRecipes.rejected, (state, action) => {
			state.isLoading = false;
			state.error = action.payload as { message: string };
		});
	},
});

export const { clearUploadedRecipes } = getUploadedRecipes.actions;

export default getUploadedRecipes.reducer;
