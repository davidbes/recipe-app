import { FC, useEffect } from 'react';
import { RecipeCard, RecipesList, Spinner } from 'components';
import { clearRecipes, fetchRecipes, openSnackbar } from 'features';
import { ScreenWrapper } from 'hoc';
import { useAppDispatch, useAppSelector } from 'hooks';
import { RecipeListItem } from 'models';
import './Discover.scss';

const Discover: FC = () => {
	const dispatch = useAppDispatch();
	const { isLoading, recipes, error } = useAppSelector(
		(state) => state.recipesAll
	);

	useEffect(() => {
		dispatch(fetchRecipes());
		return () => {
			dispatch(clearRecipes());
		};
	}, [dispatch]);

	useEffect(() => {
		if (error && error.message) {
			console.log('discover snack');
			dispatch(openSnackbar({ message: error.message, type: 'error' }));
		}
	}, [error]);

	return (
		<ScreenWrapper>
			<div className='filter-section'>Filters</div>
			<div className='items'>
				<RecipesList recipes={recipes} isLoading={isLoading} />
			</div>
		</ScreenWrapper>
	);
};

export default Discover;
