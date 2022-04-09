import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Profile } from 'models/Profile/Profile.model';

export const deleteRecipe = createAsyncThunk<
	Profile | { message: string },
	string
>('recipes/deleteRecipe', async (id, thunkAPI) => {
	const { REACT_APP_SERVER_URL } = process.env;
	try {
		const token = localStorage.getItem('token');
		const response = await fetch(REACT_APP_SERVER_URL + '/api/recipes/' + id, {
			method: 'DELETE',
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

interface deleteRecipeState {
	isLoading: boolean;
	error: {
		message: string;
	} | null;
	isDelete: boolean;
}

const initialState: deleteRecipeState = {
	isLoading: false,
	error: null,
	isDelete: false,
};

const deleteRecipeSlice = createSlice({
	name: 'get recipes',
	initialState,
	reducers: {
		clearDeleteRecipe: (state): void => {
			state.error = null;
			state.isLoading = false;
			state.isDelete = false;
		},
	},
	extraReducers: (builder): void => {
		builder.addCase(deleteRecipe.fulfilled, (state, { payload }) => {
			state.isDelete = true;
			state.isLoading = false;
		});
		builder.addCase(deleteRecipe.pending, (state) => {
			state.isDelete = false;
			state.isLoading = true;
		});
		builder.addCase(deleteRecipe.rejected, (state, action) => {
			state.isDelete = false;
			state.isLoading = false;
			state.error = action.payload as { message: string };
		});
	},
});

export const { clearDeleteRecipe } = deleteRecipeSlice.actions;

export default deleteRecipeSlice.reducer;
