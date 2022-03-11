import { ProfileImage, Spinner } from 'components';
import { clearMyProfile, fetchMyProfile } from 'features';
import { ScreenWrapper } from 'hoc';
import { useAppDispatch, useAppSelector } from 'hooks';
import { FC, useEffect } from 'react';

const Me: FC = () => {
	const dispatch = useAppDispatch();

	const { isLoading, error, myProfile } = useAppSelector(
		(state) => state.myProfile
	);

	useEffect(() => {
		dispatch(fetchMyProfile());
		return () => {
			dispatch(clearMyProfile());
		};
	}, []);

	return (
		<ScreenWrapper>
			{isLoading ? (
				<Spinner />
			) : (
				(myProfile && (
					<div>
						<ProfileImage
							img={myProfile.user.image}
							name={myProfile.user.firstName + ' ' + myProfile.user.lastName}
						/>
						{myProfile.user.firstName + ' ' + myProfile.user.lastName}
					</div>
				)) ||
				'Profile not available'
			)}
		</ScreenWrapper>
	);
};

export default Me;
