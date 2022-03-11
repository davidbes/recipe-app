import { FC, useEffect } from 'react';
import { RecipeCard, Spinner } from 'components';
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
	}, []);

	useEffect(() => {
		if (error && error.message) {
			dispatch(openSnackbar({ message: error.message, type: 'error' }));
		}
	}, [error]);

	return (
		<ScreenWrapper>
			<div className='filter-section'>Filters</div>
			<div className='items'>
				{isLoading ? (
					<div className='center-container'>
						<Spinner />
					</div>
				) : recipes && recipes.length > 0 ? (
					recipes.map(
						({
							id,
							image,
							name,
							authorName,
							authorId,
							time,
							serves,
							difficulty,
							rating,
						}: RecipeListItem) => (
							<RecipeCard
								id={id}
								image={image}
								name={name}
								author={authorName}
								authorId={authorId}
								rating={rating}
								time={time}
								difficulty={serves}
								servings={difficulty}
							/>
						)
					)
				) : (
					<div className='center-container'>No data found</div>
				)}
			</div>
		</ScreenWrapper>
	);
};

export default Discover;
