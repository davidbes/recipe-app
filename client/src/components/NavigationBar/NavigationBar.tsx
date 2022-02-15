import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Icon, NavbarItem } from 'components';
import './NavigationBar.scss';
import { Link } from 'react-router-dom';

const NavigationBar: FC = () => {
	const [auth, setAuth] = useState<boolean>(false);
	const [expandedOptions, setExpandedOptions] = useState(false);

	const { t } = useTranslation();

	// get user data from auth (image, name)

	return (
		<div className='navbar'>
			<div className='title'>Meals.io</div>
			<ul>
				<li>
					<NavbarItem icon='discover' to='/discover' text={t('discover')} />
				</li>
				{auth && (
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
			{auth ? (
				<div className='profile-section'>
					<Link to='/profile'>
						<img src='https://picsum.photos/50' alt='Avatar' loading='lazy' />
						<span>David Bester</span>
					</Link>

					<div>
						<Button
							type='tertiary'
							variation='neutral'
							onClick={() => setAuth(!auth)}
							iconOnly
						>
							<Icon icon='arrowDown' size={20} />
						</Button>
					</div>
				</div>
			) : (
				<div className='login-section'>
					<Button onClick={() => setAuth(!auth)}>{t('login')}</Button>
					<span>or</span>
					<Button type='secondary' onClick={() => setAuth(!auth)}>
						{t('register')}
					</Button>
				</div>
			)}
		</div>
	);
};

export default NavigationBar;
