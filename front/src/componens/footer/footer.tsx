import { Link } from 'react-router';

export const Footer = () => {
	return (
		<footer className='bg-[#e4e9f0] rounded-t-[90px] p-20 mt-[-65px] flex max-w-100% mx-auto justify-between items-center px-5 mt-5 gap-12  '>
			<img
				className='w-full max-w-[157px] h-[141px]'
				src='/src/assets/logo.svg'
				alt='logo'
			/>
			<div className=' w-full  justify-center text-gray-600'>
				<ul className='flex gap-2 justify-between mb-20  '>
					<li>
						<Link to=''>Мороженное</Link>
					</li>
					<li>
						<Link to=''>Полуфабрикаты</Link>
					</li>
					<li>
						<Link to=''>Лапша</Link>
					</li>
					<li>
						<Link to=''>О компании</Link>
					</li>
					<li>
						<Link to=''>Новости</Link>
					</li>
					<li>
						<Link to=''>Карьера</Link>
					</li>
					<li>
						<Link to=''>Контакты</Link>
					</li>
					<li>
						<Link to=''>Доставка Алматы</Link>
					</li>
				</ul>
				<div className=' text-gray-600 grid '>
					<ul className='flex flex-col gap-2 '>
					<li>
						<Link to=''>Шин-Лайн © 2025  </Link>
					</li>
					<li>
						<Link to=''>Политика конфиденциальности</Link>
					</li>
					<li>
						<Link to=''>Разработка и маркетинг-	WebCanape</Link>
					</li>
					</ul>
				</div>
			</div>
			<div className=''>
				<div className=''></div>
				<div className=''></div>
				<div className=''></div>
			</div>
		</footer>
	);
};
