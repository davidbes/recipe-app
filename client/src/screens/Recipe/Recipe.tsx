import { FC, useEffect, useMemo } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ScreenWrapper, WithSpinner, WithTooltip } from 'hoc';
import { useAppDispatch, useAppSelector } from 'hooks';
import {
	clearRecipes,
	openSnackbar,
	fetchOneRecipe,
	saveRecipe,
	unsaveRecipe,
	clearSaveRecipe,
	clearDeleteRecipe,
	deleteRecipe,
	toggleModal,
} from 'features';
import {
	BackButton,
	BadgesList,
	Button,
	CookingProcessModal,
	Icon,
	IngredientsList,
	InstructionsList,
	ProfileImage,
} from 'components';
import './Recipe.scss';

const Recipe: FC = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const { id } = useParams();

	const { isLoading, recipe, error } = useAppSelector(
		(state) => state.recipeOne
	);

	const { userId, isAuth } = useAppSelector((state) => state.auth);
	const { cookingProcessModal } = useAppSelector((state) => state.modals);
	const {
		isLoading: saving,
		error: savingErr,
		isSucess,
	} = useAppSelector((state) => state.saveRecipe);

	const {
		isLoading: deleting,
		error: delError,
		isDelete,
	} = useAppSelector((state) => state.deleteRecipe);

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

	useEffect(() => {
		if (!saving && isSucess) {
			dispatch(
				openSnackbar({
					message: 'Profile succesfully updated!',
					type: 'success',
				})
			);
			dispatch(fetchOneRecipe(id || ''));
		}
		return () => {
			dispatch(clearSaveRecipe());
		};
	}, [saving, isSucess, savingErr, id]);

	useEffect(() => {
		if (!deleting && isDelete) {
			navigate(-1);
			dispatch(
				openSnackbar({
					message: 'Sucessfully deleted!',
					type: 'success',
				})
			);
		}
		return () => {
			dispatch(clearDeleteRecipe());
		};
	}, [deleting, isDelete]);

	return (
		<ScreenWrapper>
			<WithSpinner isLoading={isLoading}>
				{(recipe && (
					<div className='profile'>
						<div className='top-actions'>
							<BackButton />
							<div className='right-actions'>
								{isAuth &&
									recipe?.userSaved !== null &&
									(recipe?.author.id == userId ? (
										<Button
											type='secondary'
											onClick={() => dispatch(deleteRecipe(recipe.id))}
										>
											Delete
										</Button>
									) : recipe.userSaved ? (
										<Button onClick={() => dispatch(unsaveRecipe(recipe.id))}>
											Unsave
										</Button>
									) : (
										<Button onClick={() => dispatch(saveRecipe(recipe.id))}>
											Save
										</Button>
									))}
								<Button
									onClick={() =>
										dispatch(
											toggleModal({
												modal: 'cookingProcessModal',
												toggleOpen: true,
											})
										)
									}
								>
									Cook recipe
								</Button>
							</div>
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
						{recipe.ingredients?.length > 0 && recipe.process?.length > 0 && (
							<div className='recipe-main-section'>
								<IngredientsList ingredients={recipe.ingredients} />
								<InstructionsList process={recipe.process} />
							</div>
						)}

						{cookingProcessModal && <CookingProcessModal />}
					</div>
				)) ||
					'Profile not available'}
			</WithSpinner>
		</ScreenWrapper>
	);
};
export default Recipe;
