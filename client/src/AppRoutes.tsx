import { Navigate, Route, Routes } from 'react-router-dom';
import { About, Cookbooks, Discover, Profile, Saved } from 'screens';

const AppRoutes = () => {
	return (
		<Routes>
			<Route path='/' element={<Navigate to='/discover' />} />
			<Route path='/about' element={<About />}></Route>
			<Route path='/cookbooks' element={<Cookbooks />}></Route>
			<Route path='/discover' element={<Discover />}></Route>
			<Route path='/profile' element={<Profile />}></Route>
			<Route path='/saved' element={<Saved />}></Route>
		</Routes>
	);
};

export default AppRoutes;
