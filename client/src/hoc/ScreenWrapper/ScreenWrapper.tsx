import { LoginModal, NavigationBar, Snackbar, RegisterModal } from 'components';
import { useAppSelector } from 'hooks';
import { FC } from 'react';
import './ScreenWrapper.scss';

const ScreenWrapper: FC = ({ children }) => {
	const { isActive, message, type } = useAppSelector((state) => state.snackbar);

	const { registerModal, loginModal } = useAppSelector((state) => state.modals);

	return (
		<div className='page'>
			<NavigationBar />
			<div className='content'>{children}</div>

			<div className='snackbar-wrapper'>
				<Snackbar message={message} isActive={isActive} type={type} />
			</div>
			{registerModal && <RegisterModal />}
			{loginModal && <LoginModal />}
		</div>
	);
};

export default ScreenWrapper;
