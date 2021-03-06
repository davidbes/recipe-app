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

export {
	default as searchBadgesReducer,
	fetchBadges,
	clearBadges,
} from './searchBadgesSlice/searchBadgesSlice';
export {
	default as searchIngredientsReducer,
	fetchIngredients,
	clearIngredients,
} from './searchIngredientsSlice/searchIngredientsSlice';
export {
	default as uploadRecipeReducer,
	uploadRecipe,
	clearUploadRecipeData,
} from './recipes/uploadRecipeSlice';

export {
	default as saveRecipeReducer,
	saveRecipe,
	clearSaveRecipe,
	unsaveRecipe,
} from './recipes/saveRecipeSlice';

export {
	default as deleteRecipeReducer,
	deleteRecipe,
	clearDeleteRecipe,
} from './recipes/deleteRecipeSlice';

export {
	default as rateRecipeReducer,
	rateRecipe,
	clearRateRecipe,
} from './recipes/rateRecipeSlice';
