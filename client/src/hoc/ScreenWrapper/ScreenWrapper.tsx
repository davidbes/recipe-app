import { NavigationBar } from 'components';
import { FC } from 'react';

const ScreenWrapper: FC = ({ children }) => {
	return (
		<div>
			<NavigationBar />
			{children}
		</div>
	);
};

export default ScreenWrapper;
