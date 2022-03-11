import { Spinner } from 'components';
import { verifyToken } from 'features';
import { useAppDispatch, useAppSelector } from 'hooks';
import { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import {
	About,
	Cookbooks,
	Discover,
	Profile,
	Saved,
	Recipe,
	Logout,
} from 'screens';

const AppRoutes = () => {
	const dispatch = useAppDispatch();

	const { verifyLoading } = useAppSelector((state) => state.auth);
	useEffect(() => {
		const token = localStorage.getItem('token');
		if (token) {
			dispatch(verifyToken({ token: token }));
		}
	}, [dispatch]);

	return verifyLoading ? (
		<div className='loading-screen'>
			<Spinner />
			Loading data...
		</div>
	) : (
		<Routes>
			<Route path='/' element={<Navigate to='/discover' />} />
			<Route path='/about' element={<About />}></Route>
			<Route path='/cookbooks' element={<Cookbooks />}></Route>
			<Route path='/discover' element={<Discover />}></Route>
			<Route path='/recipe/:id' element={<Recipe />}></Route>
			<Route path='/profile/:id' element={<Profile />}></Route>
			<Route path='/profile' element={<Profile />}></Route>
			<Route path='/saved' element={<Saved />}></Route>
			<Route path='/logout' element={<Logout />}></Route>
		</Routes>
	);
};

export default AppRoutes;
