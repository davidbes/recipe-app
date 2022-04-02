import { FC, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ScreenWrapper, WithSpinner, WithTooltip } from 'hoc';
import { useAppDispatch, useAppSelector } from 'hooks';
import { clearRecipes, openSnackbar, fetchOneRecipe } from 'features';
import {
	BackButton,
	BadgesList,
	Button,
	Icon,
	IngredientsList,
	InstructionsList,
	ProfileImage,
	TabSection,
} from 'components';
import './Recipe.scss';

const Recipe: FC = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const { id } = useParams();

	const { isLoading, recipe, error } = useAppSelector(
		(state) => state.recipeOne
	);

	useEffect(() => {
		dispatch(fetchOneRecipe(id || ''));
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
			<WithSpinner isLoading={isLoading}>
				{(recipe && (
					<div className='profile'>
						<div className='top-actions'>
							<BackButton />
							<Button onClick={() => console.log('Button pressed')}>
								Save
							</Button>
						</div>
						<div className='profile-data'>
							<ProfileImage img={recipe.image} name={recipe.name || ''} />
							<div className='profession'>
								<h2>{recipe.name}</h2>
								<Link to={`/profile/${recipe.author.id}`}>
									{'by ' + recipe.author.name || 'by Meals.io'}
								</Link>
							</div>
							<div className='meta-recipe'>
								<div className='meta-item'>
									<WithTooltip content={'Rating'}>
										<div className='item-content yellow'>
											{recipe.rating || 0}
											<Icon icon='star' />
										</div>
									</WithTooltip>
								</div>
								<div className='meta-item'>
									<WithTooltip content={'Time Required'}>
										<div className='item-content green'>
											{recipe.time || 0}
											<Icon icon='timer' />
										</div>
									</WithTooltip>
								</div>
								<div className='meta-item'>
									<WithTooltip content={'Difficulty'}>
										<div className='item-content blue'>
											{recipe.difficulty || 0}
											<Icon icon='weight' />
										</div>
									</WithTooltip>
								</div>

								<div className='meta-item'>
									<WithTooltip content={'Serves'}>
										<div className='item-content red'>
											{recipe.serves || 0}
											<Icon icon='serving' />
										</div>
									</WithTooltip>
								</div>
							</div>
							<BadgesList badges={recipe.badges} />
						</div>
						{/* <TabSection
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
						/> */}

						<div className='recipe-main-section'>
							<IngredientsList ingredients={recipe.ingredients} />
							<InstructionsList
								instructions={recipe.instructions}
								sections={recipe.instructionSections}
							/>
						</div>
					</div>
				)) ||
					'Profile not available'}
			</WithSpinner>
		</ScreenWrapper>
	);
};
export default Recipe;
