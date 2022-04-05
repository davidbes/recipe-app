import { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ScreenWrapper, WithSpinner } from 'hoc';
import {
	openSnackbar,
	fetchProfile,
	fetchSavedRecipes,
	fetchUploadedRecipes,
	clearSavedRecipes,
	clearUploadedRecipes,
	clearProfile,
	toggleModal,
} from 'features';
import { useAppDispatch, useAppSelector } from 'hooks';
import {
	BackButton,
	Button,
	ProfileImage,
	RecipesList,
	TabSection,
	UploadRecipeModal,
} from 'components';
import './Profile.scss';

const Profile: FC = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	// Data
	const { saved, uploaded, profile, auth, modals } = useAppSelector(
		(state) => ({
			profile: state.profile,
			saved: state.recipesSaved,
			uploaded: state.recipesUploaded,
			auth: state.auth,
			modals: state.modals,
		})
	);

	// Fetch nescessary data
	useEffect(() => {
		if (auth.userId) {
			dispatch(fetchProfile(auth.userId));
			dispatch(fetchSavedRecipes(auth.userId));
			dispatch(fetchUploadedRecipes(auth.userId));
		}
		return () => {
			dispatch(clearSavedRecipes());
			dispatch(clearUploadedRecipes());
			dispatch(clearProfile());
		};
	}, [auth, auth.userId]);

	useEffect(() => {
		if (profile.error && profile.error.message) {
			dispatch(openSnackbar({ message: profile.error.message, type: 'error' }));
		}
	}, [profile.error]);

	useEffect(() => {
		if (saved.error && saved.error.message) {
			dispatch(openSnackbar({ message: saved.error.message, type: 'error' }));
		}
	}, [saved.error]);

	useEffect(() => {
		if (uploaded.error && uploaded.error.message) {
			dispatch(
				openSnackbar({ message: uploaded.error.message, type: 'error' })
			);
		}
	}, [uploaded.error]);

	return (
		<ScreenWrapper>
			<WithSpinner isLoading={profile.isLoading}>
				{(profile && (
					<div className='profile'>
						<div className='top-actions'>
							<BackButton />
							<div className='right-actions'>
								<Button onClick={() => console.log('Button pressed')}>
									Manage
								</Button>
								<Button
									onClick={() =>
										dispatch(
											toggleModal({
												modal: 'uploadRecipeModal',
												toggleOpen: true,
											})
										)
									}
								>
									Upload Recipe
								</Button>
								{modals.uploadRecipeModal && <UploadRecipeModal />}
							</div>
						</div>
						<div className='profile-data'>
							<ProfileImage
								img={profile.profile?.image}
								name={profile.profile?.name || ''}
							/>
							<div className='profession'>
								<h2>{profile.profile?.name}</h2>
								<span>{profile.profile?.title || 'Ordinary cook'}</span>
							</div>
						</div>
						<div className='description'>
							{profile.profile?.description || 'No description available'}
						</div>
						<TabSection
							tabs={[
								{
									element: (
										<RecipesList
											recipes={uploaded.recipes}
											isLoading={uploaded.isLoading}
										/>
									),
									label: 'Uploaded',
								},
								{
									element: (
										<RecipesList
											recipes={saved.recipes}
											isLoading={saved.isLoading}
										/>
									),
									label: 'Saved',
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

export default Profile;
