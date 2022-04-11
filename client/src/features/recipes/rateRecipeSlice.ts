import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Profile } from 'models/Profile/Profile.model';
import { RecipeListItem } from 'models/Recipe/RecipeListItem.model';

export const rateRecipe = createAsyncThunk<
	{ message: string },
	{
		id: string;
		duration: number;
		serves: number;
		difficulty: number;
		rating: number;
	}
>('recipes/rateRecipe', async (arg, thunkAPI) => {
	const { REACT_APP_SERVER_URL } = process.env;
	try {
		const token = localStorage.getItem('token');
		const response = await fetch(
			REACT_APP_SERVER_URL + '/api/recipes/' + arg.id + '/rate',
			{
				method: 'POST',
				headers: {
					Accept: 'application/json',
					Authorization: token || '',
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					time: arg.duration,
					serves: arg.serves,
					difficulty: arg.difficulty,
					rating: arg.rating,
				}),
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

const rateRecipeSlice = createSlice({
	name: 'get recipes',
	initialState,
	reducers: {
		clearRateRecipe: (state): void => {
			state.error = null;
			state.isLoading = false;
			state.isSucess = false;
		},
	},
	extraReducers: (builder): void => {
		builder.addCase(rateRecipe.fulfilled, (state, { payload }) => {
			state.isSucess = true;
			state.isLoading = false;
		});
		builder.addCase(rateRecipe.pending, (state) => {
			state.isSucess = false;
			state.isLoading = true;
		});
		builder.addCase(rateRecipe.rejected, (state, action) => {
			state.isSucess = false;
			state.isLoading = false;
			state.error = action.payload as { message: string };
		});
	},
});

export const { clearRateRecipe } = rateRecipeSlice.actions;

export default rateRecipeSlice.reducer;
