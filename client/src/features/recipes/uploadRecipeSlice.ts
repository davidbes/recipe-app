import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Recipe } from 'models';

export const uploadRecipe = createAsyncThunk<
	{ id: string } | { message: string },
	FormData
>('recipes/uploadRecipe', async (formData, thunkAPI) => {
	const { REACT_APP_SERVER_URL } = process.env;
	const token = localStorage.getItem('token');

	const response = await fetch(REACT_APP_SERVER_URL + '/api/recipes', {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			Authorization: token || '',
		},
		body: formData,
	});

	const data = await response.json();

	return data;
});

interface UploadRecipeState {
	isLoading: boolean;
	isSuccess: boolean;
	recipeId: string;
	error: {
		message: string | undefined;
	};
}

const initialState: UploadRecipeState = {
	isLoading: false,
	isSuccess: false,
	recipeId: '',
	error: {
		message: undefined,
	},
};

const uploadRecipeSlice = createSlice({
	name: 'uploadRecipeSlice',
	initialState,
	reducers: {
		clearUploadRecipeData: (state) => {
			state.isLoading = false;
			state.isSuccess = false;
			state.error = {
				message: undefined,
			};
		},
	},
	extraReducers: (builder): void => {
		builder.addCase(uploadRecipe.fulfilled, (state, action) => {
			state.isLoading = false;
			state.isSuccess = true;
			state.recipeId = (action.payload as { id: string }).id;
		});
		builder.addCase(uploadRecipe.pending, (state, action) => {
			state.isLoading = true;
		});
		builder.addCase(uploadRecipe.rejected, (state, action) => {
			state.isLoading = false;
			state.isSuccess = false;
			state.error = action.payload as { message: string };
		});
	},
});

export const { clearUploadRecipeData } = uploadRecipeSlice.actions;

export default uploadRecipeSlice.reducer;
