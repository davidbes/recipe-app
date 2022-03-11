import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Recipe } from 'models/Recipe/Recipe.model';

export const fetchOneRecipe = createAsyncThunk<
	Recipe | { message: string },
	string
>('recipe/fetchOneRecipe', async (id, thunkAPI) => {
	const { REACT_APP_SERVER_URL } = process.env;
	try {
		const token = localStorage.getItem('token');
		const response = await fetch(REACT_APP_SERVER_URL + '/api/recipes/' + id, {
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

interface GetRecipeState {
	isLoading: boolean;
	recipe: Recipe | null;
	error: {
		message: string;
	} | null;
}

const initialState = {
	isLoading: false,
	recipe: null,
	error: null,
} as GetRecipeState;

const getOneRecipeSlice = createSlice({
	name: 'get one recipe',
	initialState,
	reducers: {
		clearOneRecipe: (state): void => {
			state.recipe = null;
		},
	},
	extraReducers: (builder): void => {
		builder.addCase(fetchOneRecipe.fulfilled, (state, { payload }) => {
			state.recipe = payload as Recipe;
			state.isLoading = false;
		});
		builder.addCase(fetchOneRecipe.pending, (state) => {
			state.isLoading = true;
		});
		builder.addCase(fetchOneRecipe.rejected, (state, action) => {
			state.isLoading = false;
			state.error = action.payload as { message: string };
		});
	},
});

export const { clearOneRecipe } = getOneRecipeSlice.actions;

export default getOneRecipeSlice.reducer;
