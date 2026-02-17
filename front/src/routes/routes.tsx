import { Route, Routes } from 'react-router';
import { Home } from '../pages/home';
import { News } from '../pages/news';
import { NewsPage } from '../pages/news-page'
import {ProductsPage} from "../pages/products.tsx";
import {CardPage} from "../pages/card-page.tsx";

export const AppRouter = () => {
	return (
		<Routes>
			<Route index path='/' element={<Home />} />
			<Route path='/news' element={<News />} />
			<Route path='/news/:slug' element={<NewsPage />} />
			<Route path='/products' element={<ProductsPage/>}/>
			<Route path='card' element={<CardPage/>}/>
		</Routes>

	);
};
