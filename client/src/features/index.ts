export {
	default as authReducer,
	registerUser,
	loginUser,
} from './authSlice/authSlice';
export {
	default as getRecipesReducer,
	clearRecipes,
	fetchRecipes,
} from './recipes/getRecipesSlice';
export {
	default as snackbarReducer,
	openSnackbar,
	closeSnackbar,
} from './snackbarSlice/snackbarSlice';

export {
	default as modalsReducer,
	toggleModal,
	switchModal,
} from './modalsSlice/modalsSlice';
