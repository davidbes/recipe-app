export {
	default as authReducer,
	registerUser,
	loginUser,
	verifyToken,
	logout,
} from './authSlice/authSlice';
export {
	default as getRecipesReducer,
	clearRecipes,
	fetchRecipes,
} from './recipes/getRecipesSlice';

export {
	default as getUploadedRecipesReducer,
	clearUploadedRecipes,
	fetchUploadedRecipes,
} from './recipes/getUploadedRecipes';
export {
	default as getSavedRecipesReducer,
	clearSavedRecipes,
	fetchSavedRecipes,
} from './recipes/getSavedRecipes';
export {
	default as getOneRecipeReducer,
	clearOneRecipe,
	fetchOneRecipe,
} from './recipes/getOneRecipeSlice';
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
export {
	default as getProfileReducer,
	fetchProfile,
	clearProfile,
} from './profile/getProfileSlice';
