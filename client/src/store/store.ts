import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import {
	authReducer,
	getOneRecipeReducer,
	getProfileReducer,
	getRecipesReducer,
	modalsReducer,
	snackbarReducer,
	getMyProfileReducer,
} from 'features';

export const store = configureStore({
	reducer: {
		auth: authReducer,
		recipesAll: getRecipesReducer,
		recipeOne: getOneRecipeReducer,
		profile: getProfileReducer,
		snackbar: snackbarReducer,
		modals: modalsReducer,
		myProfile: getMyProfileReducer,
	},
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	RootState,
	unknown,
	Action<string>
>;
