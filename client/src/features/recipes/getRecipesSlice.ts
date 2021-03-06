import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { OrderType, SortByType } from 'components/FilterSelects/SortSelect';
import { RecipeListItem } from 'models/Recipe/RecipeListItem.model';
import queryString from 'query-string';

export const fetchRecipes = createAsyncThunk<
	RecipeListItem[] | { message: string },
	{
		ratingRng: string;
		difficultyRng: string;
		servesRng: string;
		timeRng: string;
		search: string;
		sort: SortByType;
		order: OrderType;
		badge: string[];
		ingredient: string[];
	}
>('recipes/fetchRecipes', async (query, thunkAPI) => {
	const { REACT_APP_SERVER_URL } = process.env;
	try {
		const token = localStorage.getItem('token');

		const response = await fetch(
			REACT_APP_SERVER_URL +
				'/api/recipes?' +
				queryString.stringify(query, {
					skipEmptyString: true,
					arrayFormat: 'none',
				}),
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

interface GetRecipesState {
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
} as GetRecipesState;

const getRecipesSlice = createSlice({
	name: 'get recipes',
	initialState,
	reducers: {
		clearRecipes: (state): void => {
			state.recipes = [];
		},
	},
	extraReducers: (builder): void => {
		builder.addCase(fetchRecipes.fulfilled, (state, { payload }) => {
			state.recipes = payload as RecipeListItem[];
			state.isLoading = false;
		});
		builder.addCase(fetchRecipes.pending, (state) => {
			state.isLoading = true;
		});
		builder.addCase(fetchRecipes.rejected, (state, action) => {
			state.isLoading = false;
			state.error = action.payload as { message: string };
		});
	},
});

export const { clearRecipes } = getRecipesSlice.actions;

export default getRecipesSlice.reducer;
