import { Link } from 'react-router';

export const Header = () => {
	return (
		<header className='flex max-w-[1400px] mx-auto justify-between items-center px-5 my-5 gap-12'>
			<img
				className='w-full max-w-[157px] h-[141px]'
				src='/src/assets/logo.svg'
				alt='logo'
			/>
			<div className=' w-full justify-center text-gray-600'>
				<ul className='flex gap-2 justify-between'>
					<li>
						<Link to=''>Продукты </Link>
					</li>
					<li>
						<Link to=''>Магазины CU</Link>
					</li>
					<li>
						<Link to=''>О компании </Link>
					</li>
					<li>
						<Link to='/news'>Новости </Link>
					</li>
					<li>
						<Link to="">Карьера </Link>
					</li>
					<li>
						<Link to=''>Контакты </Link>
					</li>
					<li>
						<Link to=''>Доставка Алматы </Link>
					</li>
				</ul>
			</div>
		</header>
	);
};
