import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Profile } from 'models/Profile/Profile.model';
import { RecipeListItem } from 'models/Recipe/RecipeListItem.model';

export const saveRecipe = createAsyncThunk<
	Profile | { message: string },
	string
>('recipes/saveRecipe', async (id, thunkAPI) => {
	const { REACT_APP_SERVER_URL } = process.env;
	try {
		const token = localStorage.getItem('token');
		const response = await fetch(
			REACT_APP_SERVER_URL + '/api/profile/save?recipe=' + id,
			{
				method: 'PUT',
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

export const unsaveRecipe = createAsyncThunk<
	Profile | { message: string },
	string
>('recipes/unsaveRecipe', async (id, thunkAPI) => {
	const { REACT_APP_SERVER_URL } = process.env;
	try {
		const token = localStorage.getItem('token');
		const response = await fetch(
			REACT_APP_SERVER_URL + '/api/profile/unsave?recipe=' + id,
			{
				method: 'PUT',
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

interface SaveRecipeState {
	isLoading: boolean;
	error: {
		message: string;
	} | null;
	isSucess: boolean;
}

const initialState: SaveRecipeState = {
	isLoading: false,
	error: null,
	isSucess: false,
};

const saveRecipeSlice = createSlice({
	name: 'get recipes',
	initialState,
	reducers: {
		clearSaveRecipe: (state): void => {
			state.error = null;
			state.isLoading = false;
			state.isSucess = false;
		},
	},
	extraReducers: (builder): void => {
		builder.addCase(saveRecipe.fulfilled, (state, { payload }) => {
			state.isSucess = true;
			state.isLoading = false;
		});
		builder.addCase(saveRecipe.pending, (state) => {
			state.isSucess = false;
			state.isLoading = true;
		});
		builder.addCase(saveRecipe.rejected, (state, action) => {
			state.isSucess = false;
			state.isLoading = false;
			state.error = action.payload as { message: string };
		});
		builder.addCase(unsaveRecipe.fulfilled, (state, { payload }) => {
			state.isLoading = false;
			state.isSucess = true;
		});
		builder.addCase(unsaveRecipe.pending, (state) => {
			state.isLoading = true;
			state.isSucess = false;
		});
		builder.addCase(unsaveRecipe.rejected, (state, action) => {
			state.isLoading = false;
			state.isSucess = false;
			state.error = action.payload as { message: string };
		});
	},
});

export const { clearSaveRecipe } = saveRecipeSlice.actions;

export default saveRecipeSlice.reducer;
