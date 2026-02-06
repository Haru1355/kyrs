import { Route, Routes } from 'react-router';
import { Home } from '../pages/home';
import { News } from '../pages/news';
import { NewsPage } from '../pages/news-page'

export const AppRouter = () => {
	return (
		<Routes>
			<Route index path='/' element={<Home />} />
			<Route path='/news' element={<News />} />
			<Route path='/news/:slug' element={<NewsPage />} />
		</Routes>

	);
};
