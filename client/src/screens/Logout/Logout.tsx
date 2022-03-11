import { FC, useEffect } from 'react';
import { logout } from 'features';
import { useAppDispatch } from 'hooks';
import { Navigate } from 'react-router-dom';

const Logout: FC = () => {
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(logout());
	}, []);

	return <Navigate to='/discover' />;
};

export default Logout;
