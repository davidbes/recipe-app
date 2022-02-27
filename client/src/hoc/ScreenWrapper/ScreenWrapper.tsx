import { NavigationBar, Snackbar } from 'components';
import { useAppSelector } from 'hooks';
import { FC } from 'react';
import './ScreenWrapper.scss';

const ScreenWrapper: FC = ({ children }) => {
	const { isActive, message } = useAppSelector((state) => state.snackbar);
	return (
		<div className='page'>
			<NavigationBar />
			<div className='content'>{children}</div>

			<div className='snackbar-wrapper'>
				<Snackbar message={message} isActive={isActive} />
			</div>
		</div>
	);
};

export default ScreenWrapper;
