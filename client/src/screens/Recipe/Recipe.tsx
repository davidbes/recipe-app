import { FC, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ScreenWrapper } from 'hoc';
import { useAppDispatch, useAppSelector } from 'hooks';
import { clearRecipes, openSnackbar, fetchOneRecipe } from 'features';
import { Spinner } from 'components';

const Recipe: FC = () => {
	const { id } = useParams();

	const dispatch = useAppDispatch();
	const { isLoading, recipe, error } = useAppSelector(
		(state) => state.recipeOne
	);

	useEffect(() => {
		dispatch(
			id
				? fetchOneRecipe(id)
				: openSnackbar({ message: 'An error occured!', type: 'error' })
		);
		return () => {
			dispatch(clearRecipes());
		};
	}, [id]);

	useEffect(() => {
		if (error && error.message) {
			dispatch(openSnackbar({ message: error.message, type: 'error' }));
		}
	}, [error]);

	return (
		<ScreenWrapper>
			{isLoading ? <Spinner /> : recipe && <div>{recipe.name}</div>}
		</ScreenWrapper>
	);
};
export default Recipe;
