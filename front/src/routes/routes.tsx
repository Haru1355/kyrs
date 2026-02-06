import { Route, Routes } from 'react-router';
import { Home } from '../pages/home';
import { News } from '../pages/news';

export const AppRouter = () => {
	return (
		<Routes>
			<Route index path='/' element={<Home />} />
			<Route path='/news' element={<News />} />
		</Routes>
	);
};
