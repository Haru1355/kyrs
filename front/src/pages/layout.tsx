import { Footer } from '../componens/footer/footer'
import { Header } from '../componens/header/header.tsx';
import '../index.css';
import { AppRouter } from '../routes/routes';

export const Layout = () => {
	return (
		<div className='w-full min-h-screen flex flex-col'>
			<Header />
			<main className='flex-1 w-full bg-white'>
				<AppRouter />
			</main>
            <Footer />
		</div>
	);
};
