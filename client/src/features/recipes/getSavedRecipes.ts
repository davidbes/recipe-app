import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RecipeListItem } from 'models/Recipe/RecipeListItem.model';

export const fetchSavedRecipes = createAsyncThunk<
	RecipeListItem[] | { message: string },
	string
>('recipes/fetchSavedRecipes', async (id, thunkAPI) => {
	const { REACT_APP_SERVER_URL } = process.env;
	try {
		const token = localStorage.getItem('token');
		const response = await fetch(
			REACT_APP_SERVER_URL + '/api/profile/' + id + '/saved',
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

interface GetSavedRecipesState {
	isLoading: boolean;
	recipes: RecipeListItem[];
	error: {
		message: string;
	} | null;
}

const initialState: GetSavedRecipesState = {
	isLoading: false,
	recipes: [],
	error: null,
};

const getSavedRecipes = createSlice({
	name: 'get recipes',
	initialState,
	reducers: {
		clearSavedRecipes: (state): void => {
			state.recipes = [];
		},
	},
	extraReducers: (builder): void => {
		builder.addCase(fetchSavedRecipes.fulfilled, (state, { payload }) => {
			state.recipes = payload as RecipeListItem[];
			state.isLoading = false;
		});
		builder.addCase(fetchSavedRecipes.pending, (state) => {
			state.isLoading = true;
		});
		builder.addCase(fetchSavedRecipes.rejected, (state, action) => {
			state.isLoading = false;
			state.error = action.payload as { message: string };
		});
	},
});

export const { clearSavedRecipes } = getSavedRecipes.actions;

export default getSavedRecipes.reducer;
