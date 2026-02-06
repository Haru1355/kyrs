import { Footer } from '../componens/footer/footer'
import { Header } from '../componens/heder/heder';
import '../index.css';
import { AppRouter } from '../routes/routes';
export const Layout = () => {
	return (
		<div className='container mx-auto'>
			<Header />
			<main>
				<AppRouter />
			</main>
            <Footer />
		</div>
	);
};
