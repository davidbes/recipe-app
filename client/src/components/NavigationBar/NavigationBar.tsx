import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Icon, NavbarItem } from 'components';
import './NavigationBar.scss';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'hooks';
import { toggleModal } from 'features';

const NavigationBar: FC = () => {
	const { t } = useTranslation();

	const { isAuth, fullName, imageUrl } = useAppSelector((state) => state.auth);

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
						<img src={imageUrl} alt='Avatar' loading='lazy' />
						<span>{fullName}</span>
					</Link>

					<div>
						<Button
							type='tertiary'
							variation='neutral'
							onClick={() => console.log('Pressed icon')}
							iconOnly
						>
							<Icon icon='arrowDown' size={20} />
						</Button>
					</div>
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
