import { NavigationBar } from 'components';
import { FC } from 'react';
import './ScreenWrapper.scss';

const ScreenWrapper: FC = ({ children }) => (
	<div className='page'>
		<NavigationBar />
		<div className='content'>{children}</div>
	</div>
);

export default ScreenWrapper;
