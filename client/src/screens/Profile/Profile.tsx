import { FC, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ScreenWrapper } from 'hoc';
import { openSnackbar, clearRecipes, fetchProfile } from 'features';
import { useAppDispatch, useAppSelector } from 'hooks';
import { ProfileImage, Spinner } from 'components';

const Profile: FC = () => {
	const { id } = useParams();

	const dispatch = useAppDispatch();
	const { isLoading, profile, error } = useAppSelector(
		(state) => state.profile
	);

	useEffect(() => {
		dispatch(
			id
				? fetchProfile(id)
				: openSnackbar({ message: 'An error occured!', type: 'error' })
		);
		return () => {
			dispatch(clearRecipes());
		};
	}, [id]);

	useEffect(() => {
		console.log('Hello');
		if (error && error.message) {
			dispatch(openSnackbar({ message: error.message, type: 'error' }));
		}
	}, [error]);

	return (
		<ScreenWrapper>
			{isLoading ? (
				<Spinner />
			) : (
				(profile && (
					<div>
						<ProfileImage
							img={profile.image}
							name={profile.firstName + ' ' + profile.lastName}
						/>
						{profile.firstName + ' ' + profile.lastName}
					</div>
				)) ||
				'Profile not available'
			)}
		</ScreenWrapper>
	);
};

export default Profile;
