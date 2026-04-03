import {Link, useLocation} from 'react-router';
import {ShoppingCart, Menu, X} from "lucide-react";
import {useAtomValue} from "jotai";
import {cardAtom} from "../../store/store-card.ts";
import { useState } from 'react';

// Константы
const BRAND_COLOR = '#e50909';

const NAV_LINKS = [
	{ to: '/products', label: 'Продукты' },
	{ to: '', label: 'Магазины CU' },
	{ to: '', label: 'О компании' },
	{ to: '/news', label: 'Новости' },
	{ to: '', label: 'Карьера' },
	{ to: '', label: 'Контакты' },
	{ to: '', label: 'Доставка Алматы' },
] as const;

export const Header = () => {
	const card = useAtomValue(cardAtom)
	const location = useLocation();
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	return (
		<header className='flex max-w-full mx-auto justify-between items-center px-4 sm:px-6 lg:px-8 py-3 sm:py-5 gap-4 sm:gap-8'>
			{/* Логотип */}
			{location.pathname !== '/' && (
				<Link to='/' className='flex-shrink-0'>
					<img
						className='w-20 sm:w-28 lg:w-[157px] h-auto max-w-[157px]'
						src='/src/assets/logo.svg'
						alt='logo'
					/>
				</Link>
			)}

			{/* Навигация для десктопа */}
			<nav className='hidden md:flex w-full justify-center text-gray-600 flex-1'>
				<ul className='flex gap-1 lg:gap-2 justify-center flex-wrap'>
					{NAV_LINKS.map((link) => (
						<li key={link.to} className='flex items-center justify-center'>
							<Link to={link.to} className='text-xs sm:text-sm lg:text-base px-2 lg:px-3 py-2 hover:text-[#e50909] transition-colors'>
								{link.label}
							</Link>
						</li>
					))}
				</ul>
			</nav>

			{/* Кнопка корзины */}
			<Link to='/card' className='flex-shrink-0 text-white border flex items-center justify-center p-2 sm:p-3 rounded-full relative hover:opacity-90 transition-opacity' style={{ backgroundColor: BRAND_COLOR }}>
				<span className='absolute top-0 right-0 bg-white text-xs aspect-square size-4 sm:size-5 flex items-center justify-center rounded-full border font-bold transform translate-x-1 -translate-y-1' style={{ color: BRAND_COLOR }}>
					{card.reduce((acc, item) => acc + item.count, 0)}
				</span>
				<ShoppingCart className='w-5 h-5 sm:w-6 sm:h-6' />
			</Link>

			{/* Кнопка меню для мобильных */}
			<button
				onClick={() => setIsMenuOpen(!isMenuOpen)}
				className='md:hidden flex-shrink-0 text-gray-600 hover:text-[#e50909] transition-colors'
			>
				{isMenuOpen ? <X className='w-6 h-6' /> : <Menu className='w-6 h-6' />}
			</button>

			{/* Мобильное меню */}
			{isMenuOpen && (
				<nav className='absolute top-full left-0 right-0 md:hidden bg-white border-b border-gray-200 shadow-lg z-50'>
					<ul className='flex flex-col divide-y'>
						{NAV_LINKS.map((link) => (
							<li key={link.to}>
								<Link
									to={link.to}
									className='block text-gray-600 px-4 py-3 text-sm hover:text-[#e50909] hover:bg-gray-50 transition-colors'
									onClick={() => setIsMenuOpen(false)}
								>
									{link.label}
								</Link>
							</li>
						))}
					</ul>
				</nav>
			)}
		</header>
	);
};
