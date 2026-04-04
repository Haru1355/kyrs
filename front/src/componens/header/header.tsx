import { useAtomValue } from 'jotai';
import { Globe, Instagram, Menu, Search, ShoppingCart, X } from 'lucide-react';
import { useState } from 'react';
import { Link, useLocation } from 'react-router';
import { cardAtom } from '../../store/store-card.ts';

const NAV_LINKS = [
	{ to: '/products', label: 'Продукты' },
	{ to: '/stores', label: 'Магазины CU' },
	{ to: '/about', label: 'О компании' },
	{ to: '/news', label: 'Новости' },
	{ to: '/career', label: 'Карьера' },
	{ to: '/contacts', label: 'Контакты' },
	{ to: '/delivery', label: 'Доставка Алматы' },
] as const;

export const Header = () => {
	const card = useAtomValue(cardAtom);
	const location = useLocation();
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	return (
		<header className='relative w-full bg-white z-30'>
			<div className='mx-auto flex items-center justify-between px-4 py-2 sm:px-6 sm:py-3 gap-3'>
				<div className='flex items-center gap-3'>
					<div className='hidden sm:flex items-center justify-center w-15 h-15 rounded-full bg-gray-100 font-semibold text-base text-gray-700'>
						Ru
					</div>
					{location.pathname !== '/' && (
						<Link to='/' className='shrink-0'>
							<img
								className='w-20 sm:w-28 lg:w-[157px] h-auto max-w-[157px]'
								src='/src/assets/logo.svg'
								alt='logo'
							/>
						</Link>
					)}
				</div>

				<nav className='hidden md:flex flex-1 justify-center'>
					<ul className='flex flex-wrap items-center gap-2 lg:gap-4'>
						{NAV_LINKS.map(link => (
							<li key={link.to}>
								<Link
									to={link.to}
									className='text-base sm:text-lg px-8 py-6 rounded-lg hover:bg-gray-100 hover:text-[#e50909] transition-all'
								>
									{link.label}
								</Link>
							</li>
						))}
					</ul>
				</nav>

				<div className='flex items-center gap-2'>
					<div className='hidden sm:flex items-center gap-2'>
						<button className='p-3 rounded-full hover:bg-gray-100 transition-colors'>
							<Search className='w-8 h-8 text-gray-600' />
						</button>
						<a
							href='https://www.instagram.com'
							target='_blank'
							rel='noreferrer'
							className='p-3 rounded-full hover:bg-gray-100 transition-colors'
						>
							<Instagram className='w-5 h-5 text-gray-600' />
						</a>
						<a
							href='https://www.tiktok.com'
							target='_blank'
							rel='noreferrer'
							className='p-2 rounded-full hover:bg-gray-100 transition-colors'
						>
							<Globe className='w-5 h-5 text-gray-600' />
						</a>
					</div>

					<Link
						to='/card'
						className='relative flex items-center justify-center rounded-full bg-[#e50909] p-5 text-white hover:opacity-90 transition-opacity'
					>
						<span className='absolute -top-1 -right-1 grid h-6 w-6 place-items-center rounded-full bg-white text-sm font-bold text-[#e50909]'>
							{card.reduce((acc, item) => acc + item.count, 0)}
						</span>
						<ShoppingCart className='w-6 h-6' />
					</Link>

					<button
						onClick={() => setIsMenuOpen(!isMenuOpen)}
						className='md:hidden p-3 rounded-md text-gray-700 hover:bg-gray-100 transition-colors'
					>
						{isMenuOpen ? (
							<X className='w-7 h-7' />
						) : (
							<Menu className='w-7 h-7' />
						)}
					</button>
				</div>
			</div>

			{isMenuOpen && (
				<div className='absolute inset-x-0 top-full bg-white shadow-lg z-40 sm:hidden'>
					<div className='px-5 py-5 space-y-3'>
						{NAV_LINKS.map(link => (
							<Link
								key={link.to}
								to={link.to}
								className='block rounded-xl border border-gray-200 bg-gray-50 px-5 py-4 text-base font-medium text-gray-700 hover:bg-[#fef2f2] hover:text-[#e50909] transition-all'
								onClick={() => setIsMenuOpen(false)}
							>
								{link.label}
							</Link>
						))}
						<div className='flex items-center gap-2'>
							<button className='flex-1 rounded-xl border border-gray-200 bg-white px-5 py-3 text-base text-gray-600 hover:bg-gray-100'>
								<Search className='inline-block mr-2 h-5 w-5' />
								Поиск
							</button>
							<a
								href='https://www.instagram.com'
								target='_blank'
								rel='noreferrer'
								className='flex-1 rounded-xl border border-gray-200 bg-white px-5 py-3 text-base text-gray-600 hover:bg-gray-100'
							>
								Instagram
							</a>
						</div>
					</div>
				</div>
			)}
		</header>
	);
};
