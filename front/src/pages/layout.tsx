import { Footer } from '../componens/footer/footer'
import { Header } from '../componens/header/header.tsx';
import '../index.css';
import { AppRouter } from '../routes/routes';
export const Layout = () => {
	return (
		<div className='container '>
			<Header />
			<main>
				<AppRouter />
			</main>
            <Footer />
		</div>
	);
};
