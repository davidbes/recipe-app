import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { IoChevronDownOutline } from 'react-icons/io5';
import { Button, Icon, IconDropdownButton, NavbarItem } from 'components';
import './NavigationBar.scss';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'hooks';
import { toggleModal } from 'features';
import { logout } from 'features/authSlice/authSlice';

const NavigationBar: FC = () => {
	const { t } = useTranslation();
	const navigate = useNavigate();
	const { isAuth, fullName, image, userId } = useAppSelector(
		(state) => state.auth
	);

	const dispatch = useAppDispatch();
	return (
		<div className='navbar'>
			<div className='title'>Meals.io</div>
			<ul>
				<li>
					<NavbarItem icon='discover' to='/discover' text={t('discover')} />
				</li>
				{isAuth && (
					<>
						<li>
							<NavbarItem icon='book' to='/cookbooks' text={t('cookbooks')} />
						</li>
						<li>
							<NavbarItem icon='bookmark' to='/saved' text={t('saved')} />
						</li>
					</>
				)}
				<li>
					<NavbarItem icon='info' to='/about' text={t('about')} />
				</li>
			</ul>
			{isAuth ? (
				<div className='profile-section'>
					<Link to='/profile'>
						{fullName && image ? (
							<img src={image} alt='Avatar' />
						) : (
							<div className='no-image-avatar'>{fullName.charAt(0)}</div>
						)}
						<span>{fullName}</span>
					</Link>
					<IconDropdownButton
						options={[
							{
								label: 'My profile',
								action: () => navigate('/profile'),
							},
							{
								label: 'Preferences',
								action: () => navigate('/me/preferences'),
							},
							{
								label: 'Logout',
								action: () => navigate('/logout'),
								type: 'danger',
							},
						]}
					>
						<IoChevronDownOutline />
					</IconDropdownButton>
				</div>
			) : (
				<div className='login-section'>
					<Button
						onClick={() =>
							dispatch(toggleModal({ modal: 'loginModal', toggleOpen: true }))
						}
					>
						{t('login')}
					</Button>
					<span>or</span>
					<Button
						type='secondary'
						onClick={() =>
							dispatch(
								toggleModal({ modal: 'registerModal', toggleOpen: true })
							)
						}
					>
						{t('register')}
					</Button>
				</div>
			)}
		</div>
	);
};

export default NavigationBar;
