import { FC, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ScreenWrapper, WithSpinner, WithTooltip } from 'hoc';
import { useAppDispatch, useAppSelector } from 'hooks';
import { clearRecipes, openSnackbar, fetchOneRecipe } from 'features';
import { BadgesList, Button, Icon, ProfileImage, TabSection } from 'components';
import { HiArrowSmLeft } from 'react-icons/hi';
import './Recipe.scss';

const Recipe: FC = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const { id } = useParams();

	const { recipe } = useAppSelector((state) => ({
		recipe: state.recipeOne,
	}));

	useEffect(() => {
		dispatch(fetchOneRecipe(id || ''));
		return () => {
			dispatch(clearRecipes());
		};
	}, [id]);

	useEffect(() => {
		if (recipe.error && recipe.error.message) {
			dispatch(openSnackbar({ message: recipe.error.message, type: 'error' }));
		}
	}, [recipe.error]);

	return (
		<ScreenWrapper>
			<WithSpinner isLoading={recipe.isLoading}>
				{(recipe.recipe && (
					<div className='profile'>
						<div className='main-section'>
							<button className='back-action' onClick={() => navigate(-1)}>
								<HiArrowSmLeft />
							</button>
							<div className='profile-data'>
								<ProfileImage
									img={recipe.recipe.image}
									name={recipe.recipe.name || ''}
								/>
								<div className='profession'>
									<h2>{recipe.recipe.name}</h2>
									<span>{recipe.recipe.author || 'by Meals.io'}</span>
								</div>
								<div className='meta-recipe'>
									<div className='meta-item'>
										<WithTooltip content={'Rating'}>
											<div className='item-content yellow'>
												{recipe.recipe.averages?.rating || 0}
												<Icon icon='star' />
											</div>
										</WithTooltip>
									</div>
									<div className='meta-item'>
										<WithTooltip content={'Time Required'}>
											<div className='item-content green'>
												{recipe.recipe.averages?.time || 0}
												<Icon icon='timer' />
											</div>
										</WithTooltip>
									</div>
									<div className='meta-item'>
										<WithTooltip content={'Difficulty'}>
											<div className='item-content blue'>
												{recipe.recipe.averages?.difficulty || 0}
												<Icon icon='weight' />
											</div>
										</WithTooltip>
									</div>

									<div className='meta-item'>
										<WithTooltip content={'Serves'}>
											<div className='item-content red'>
												{recipe.recipe.averages?.serves || 0}
												<Icon icon='serving' />
											</div>
										</WithTooltip>
									</div>
								</div>
								<BadgesList badges={recipe.recipe.badges} />
							</div>
							<div className='actions'>
								<Button onClick={() => console.log('Button pressed')}>
									Save
								</Button>
							</div>
						</div>
						<TabSection
							tabs={[
								{
									element: <div>Ingrediets</div>,
									label: 'Ingredients',
								},
								{
									element: <div>Ingrediets</div>,
									label: 'Instructions',
								},
							]}
						/>
					</div>
				)) ||
					'Profile not available'}
			</WithSpinner>
		</ScreenWrapper>
	);
};
export default Recipe;
