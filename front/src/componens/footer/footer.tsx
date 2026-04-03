import { Link } from 'react-router';

export const Footer = () => {
	return (
		<footer className='w-full bg-[#e4e9f0] px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16'>
			<div className='w-full'>
				<div className='flex flex-col md:flex-row gap-8 md:gap-12 justify-between items-start'>
					{/* Логотип */}
					<img
						className='w-24 md:w-32 lg:w-[157px] h-20 md:h-24 lg:h-[141px] object-contain flex-shrink-0'
						src='/src/assets/logo.svg'
						alt='logo'
					/>

					{/* Основные ссылки */}
					<div className='w-full md:flex-1'>
						<ul className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-6 md:mb-10 text-gray-600 text-sm md:text-base'>
							<li className='hover:text-[#e50909] transition-colors'>
								<Link to=''>Мороженное</Link>
							</li>
							<li className='hover:text-[#e50909] transition-colors'>
								<Link to=''>Полуфабрикаты</Link>
							</li>
							<li className='hover:text-[#e50909] transition-colors'>
								<Link to=''>Лапша</Link>
							</li>
							<li className='hover:text-[#e50909] transition-colors'>
								<Link to=''>О компании</Link>
							</li>
							<li className='hover:text-[#e50909] transition-colors'>
								<Link to=''>Новости</Link>
							</li>
							<li className='hover:text-[#e50909] transition-colors'>
								<Link to=''>Карьера</Link>
							</li>
							<li className='hover:text-[#e50909] transition-colors'>
								<Link to=''>Контакты</Link>
							</li>
							<li className='hover:text-[#e50909] transition-colors'>
								<Link to=''>Доставка Алматы</Link>
							</li>
						</ul>

						{/* Информация */}
						<div className='border-t pt-4 md:pt-6'>
							<ul className='flex flex-col gap-2 text-gray-600 text-xs md:text-sm'>
								<li>
									<Link to='' className='hover:text-[#e50909] transition-colors'>
										Шин-Лайн © 2025
									</Link>
								</li>
								<li>
									<Link to='' className='hover:text-[#e50909] transition-colors'>
										Политика конфиденциальности
									</Link>
								</li>
								<li>
									<Link to='' className='hover:text-[#e50909] transition-colors'>
										Разработка и маркетинг - WebCanape
									</Link>
								</li>
							</ul>
						</div>
					</div>

					{/* Социальные сети (заготовка) */}
					<div className='flex gap-3 md:gap-4'>
						<div className='w-10 h-10 md:w-12 md:h-12 bg-gray-300 rounded-full hover:bg-[#e50909] transition-colors cursor-pointer'></div>
						<div className='w-10 h-10 md:w-12 md:h-12 bg-gray-300 rounded-full hover:bg-[#e50909] transition-colors cursor-pointer'></div>
						<div className='w-10 h-10 md:w-12 md:h-12 bg-gray-300 rounded-full hover:bg-[#e50909] transition-colors cursor-pointer'></div>
					</div>
				</div>
			</div>
		</footer>
	);
};
