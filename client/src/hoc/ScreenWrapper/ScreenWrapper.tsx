import { LoginModal, NavigationBar, Snackbar } from 'components';
import RegisterModal from 'components/Modals/RegisterModal';
import { useAppSelector } from 'hooks';
import { FC } from 'react';
import './ScreenWrapper.scss';

const ScreenWrapper: FC = ({ children }) => {
	const { isActive, message } = useAppSelector((state) => state.snackbar);

	const { registerModal, loginModal } = useAppSelector((state) => state.modals);

	return (
		<div className='page'>
			<NavigationBar />
			<div className='content'>{children}</div>

			<div className='snackbar-wrapper'>
				<Snackbar message={message} isActive={isActive} />
			</div>
			{registerModal && <RegisterModal />}
			{loginModal && <LoginModal />}
		</div>
	);
};

export default ScreenWrapper;
