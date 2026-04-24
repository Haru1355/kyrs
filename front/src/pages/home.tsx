import cn from 'classnames';
import { useState } from 'react';
import { Link } from 'react-router';
import { HomeNewsSection } from '../componens/home-news/home-news.tsx';
import { HomeOfficeMap } from '../componens/home-office-map/home-office-map.tsx';

// Константа вне компонента - создается один раз
const CARDS = [
	{
		id: 0,
		title: 'Мороженное',
		p: 'Крупнейшее производство в Центральной Азии: инновационные технологии и 163 вида мороженого',
		description: 'c 1995 года',
		image: '/src/assets/main/hovered-items/icecream.png',
	},
	{
		id: 1,
		title: 'Замороженные полуфабрикаты',
		p: 'Высокое качество замороженных полуфабрикатов для оптовых и розничных клиентов',
		description: 'c 2009 года',
		image: '/src/assets/main/hovered-items/polyfab.png',
	},
	{
		id: 2,
		title: 'Лапша быстрого приготовления',
		p: 'Популярные лапша и макаронные изделия с соусами и оригинальными вкусами',
		description: 'c 2012 года',
		image: '/src/assets/main/hovered-items/lapsha.png',
	},
	{
		id: 3,
		title: 'Розничная сеть CU в Казахстане',
		p: 'Удобная розничная сеть с доставкой товаров в пункты выдачи',
		description: 'c 2024 года',
		image: '/src/assets/main/hovered-items/CU.png',
	},
] as const;

export const Home = () => {
	const [activeIndex, setActiveIndex] = useState(0);

	return (
		<div className='w-full'>
			{/* Главное изображение с SVG: на мобильном без отриц. margin — баннер целиком под шапкой; выше — с sm */}
			<div className='relative mt-0 sm:-mt-3 md:-mt-5 lg:-mt-7 xl:-mt-8'>
				<img
					src='/src/assets/main/1main.webp'
					alt='Шин-Лайн'
					className='w-full h-auto'
				/>
				{/* SVG декоративное — меньше, чтобы целиком влезало и читалось */}
				<div className='absolute top-[14%] sm:top-[16%] md:top-[17%] left-3 sm:left-5 md:left-6 lg:left-10 xl:left-14 max-w-[min(88vw,20rem)] sm:max-w-[min(80vw,24rem)] md:max-w-[min(72vw,28rem)] lg:max-w-[min(55vw,32rem)] xl:max-w-[36rem] pointer-events-none'>
					<img
						src='/src/assets/main/2main.svg'
						alt=''
						className='w-full h-auto object-contain object-left'
					/>
				</div>
			</div>

			{/* Секция 1: Описание + Статистика */}
			<div className='flex flex-col md:flex-row pb-10 md:pb-16 lg:pb-[70px] -mt-8 sm:-mt-12 md:-mt-20 lg:-mt-[90px] rounded-t-2xl md:rounded-t-3xl lg:rounded-t-[90px] bg-white transform-3d'>
				{/* Текст */}
				<div className='w-full md:w-1/2 pt-6 sm:pt-10 md:pt-16 lg:pt-20 px-4 sm:px-6 md:pl-8 lg:pl-[110px] lg:pr-20'>
					<h1 className='font-[cursive] font-bold text-2xl sm:text-3xl md:text-4xl lg:text-[50px] leading-tight'>
						Группа компаний Шин-Лайн
					</h1>
					<p className='font-[cursive] text-sm sm:text-base md:text-lg lg:text-2xl mt-4 md:mt-6 leading-relaxed'>
						Основанная в 1995 году как семейное предприятие, сегодня компания
						стала №1 по производству мороженого в Центральной Азии. В 2025 году
						мы выпустили 37 000 тонн продукции, соответствующей международным
						стандартам качества.
					</p>
					<Link
						to=''
						className='inline-flex items-center text-sm md:text-lg lg:text-xl bg-[#a49a9a67] rounded-full px-6 md:px-10 py-2 md:py-3 relative mt-4 md:mt-8 hover:bg-[#a49a9a] transition-colors'
					>
						Подробнее
						<img
							className='ml-2 md:ml-3 w-4 h-4 md:w-5 md:h-5'
							src='/src/assets/arrow.svg'
							alt=''
						/>
					</Link>
				</div>

				{/* Статистика */}
				<div className='w-full md:w-1/2 pt-6 sm:pt-10 md:pt-16 lg:pt-20 pb-8 sm:pb-12 md:pb-20 lg:pb-[150px] px-4 sm:px-6 md:pl-8 lg:pl-20 lg:pr-[140px] bg-[#e4e9f0] md:rounded-t-3xl lg:rounded-t-[90px] rounded-t-2xl mt-6 md:mt-0'>
					<ul className='space-y-4 md:space-y-6'>
						{[
							{ num: '10', text: 'Стран импортеров' },
							{ num: '16', text: 'Филиалов' },
							{ num: '100', text: 'Дистрибьюторов' },
							{ num: '130.000', text: 'Точек продаж' },
						].map(item => (
							<li
								key={item.num}
								className='md:-rotate-10 flex flex-wrap items-center gap-2 sm:gap-4 md:gap-6 lg:gap-[30px] leading-none'
							>
								<span className='text-3xl sm:text-5xl md:text-6xl lg:text-[100px] font-extrabold text-[#e50909]'>
									{item.num}
								</span>
								<span className='max-w-[220px] text-base sm:text-lg md:text-xl lg:text-[26px] font-semibold'>
									{item.text}
								</span>
							</li>
						))}
					</ul>
				</div>
			</div>

			{/* Секция 2: Крупнейший комплекс */}
			<div className='relative pb-10 md:pb-16 lg:pb-[70px] -mt-16 md:-mt-20 lg:-mt-[90px]'>
				<img
					src='/src/assets/main/3main.webp'
					alt=''
					className='w-full h-auto bg-white/30 rounded-t-2xl md:rounded-t-3xl lg:rounded-t-[90px] backdrop-brightness-50'
				/>
				<div className='absolute inset-0 flex flex-col justify-center top-4 sm:top-8 md:top-16 lg:top-20 left-4 sm:left-6 md:left-8 lg:left-20 right-4 sm:right-6 md:right-8 lg:right-20 pr-4 sm:pr-6 md:pr-8 lg:pr-20'>
					<h1 className='font-bold text-2xl sm:text-3xl md:text-5xl lg:text-[80px] text-white leading-tight'>
						Крупнейший индустриальный комплекс
					</h1>
					<h3 className='font-[cursive] font-bold text-base sm:text-lg md:text-2xl lg:text-[30px] text-white mt-3 sm:mt-4 md:mt-6'>
						37 000 тонн производства в 2025 году
					</h3>
				</div>
			</div>

			{/* Секция 3: Направления деятельности */}
			<div className='mt-[-30px] md:-mt-20 lg:-mt-[150px] transform-3d bg-white pt-6 sm:pt-10 md:pt-16 lg:pt-[90px] rounded-t-2xl md:rounded-t-3xl lg:rounded-t-[90px] pb-10 md:pb-16 lg:pb-20'>
				<h2 className='font-[cursive] text-2xl sm:text-3xl md:text-4xl lg:text-[40px] text-center px-4 sm:px-8 md:px-12 lg:px-20'>
					Направления деятельности
				</h2>

				{/* Мобильная версия: список карточек */}
				<div className='md:hidden mt-6 space-y-4 px-4 '>
					{CARDS.map(card => (
						<div
							key={card.id}
							className='relative h-full rounded-2xl overflow-hidden cursor-pointer'
							onClick={() => setActiveIndex(card.id)}
						>
							<img
								src={card.image}
								alt={card.title}
								className='w-full h-full object-cover'
							/>
							<div className='absolute inset-0 bg-black/40 flex flex-col justify-end p-4 text-white font-[cursive]'>
								<p className='text-xs'>{card.description}</p>
								<h3 className='font-bold text-lg'>{card.title}</h3>
								<p className='text-xs line-clamp-2'>{card.p}</p>
							</div>
						</div>
					))}
				</div>

				{/* Планшет+: интерактивные карточки */}
				<div className='hidden md:flex flex-wrap gap-3 lg:gap-5 font-[cursive] text-fuchsia-50 mt-6 md:mt-10 px-4 sm:px-6 md:px-8 lg:px-20 pb-4'>
					{CARDS.map(card => (
						<div
							key={card.id}
							className={cn(
								'relative flex flex-col gap-y-5 justify-between pt-6 md:pt-8 lg:pt-[45px] px-3 lg:px-5 pb-5 lg:pb-[25px] transition-all duration-300 rounded-[20px] shrink-0 cursor-pointer',
								{
									'w-56! md:w-64! lg:w-[480px]! lg:aspect-square h-56 md:h-[480px]':
										activeIndex === card.id,
									'w-40 md:w-48 lg:w-[calc((100%-630px)/3)] h-full md:h-[480px]':
										activeIndex !== card.id,
								},
							)}
							onMouseEnter={() => setActiveIndex(card.id)}
						>
							<div className='absolute w-full h-full inset-0 rounded-[20px]'>
								<img
									src={card.image}
									alt={card.title}
									className={cn(
										'object-bottom object-cover w-full h-[480px]! rounded-[20px] transition-all duration-300',
										{
											'rounded-[500px]': activeIndex === card.id,
										},
									)}
								/>
							</div>
							<div className='relative z-10 max-w-[330px] mx-auto text-center'>
								<p className='text-xs lg:text-base'>{card.description}</p>
								<h1 className='text-sm lg:text-[20px] font-bold'>
									{card.title}
								</h1>
								<p className='text-xs lg:text-base line-clamp-3'>{card.p}</p>
							</div>
						</div>
					))}
				</div>
			</div>

			<HomeNewsSection />

			{/* Секция 4: Контакты */}
			<div className='pt-6 sm:pt-10 md:pt-16 lg:pt-20 pb-12 md:pb-20 lg:pb-[150px] px-4 sm:px-6 md:px-8 lg:px-20 bg-[#f6f7fa] rounded-t-2xl md:rounded-t-3xl lg:rounded-t-[90px]'>
				<h1 className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-[#1f2937] text-center font-[cursive]'>
					Контакты
				</h1>
				<div className='mt-10 grid gap-6 md:grid-cols-3'>
					<div className='rounded-[30px] bg-white p-8 shadow-[0_35px_60px_-30px_rgba(15,23,42,0.35)]'>
						<h3 className='text-xl font-semibold text-[#242f3d] mb-4'>
							ТОО «Шин-Лайн»
						</h3>
						<p className='text-sm leading-7 text-[#4b5563]'>
							Алматинская область, Илийский район, с. Байсерке,
							<br />
							улица Султана Бейбариса, 58
						</p>
					</div>
					<div className='rounded-[30px] bg-white p-8 shadow-[0_35px_60px_-30px_rgba(15,23,42,0.35)]'>
						<h3 className='text-xl font-semibold text-[#242f3d] mb-4'>
							По общим вопросам
						</h3>
						<p className='text-base font-semibold text-[#1f2937] mb-3'>
							+7 727 220 84 11
						</p>
						<p className='text-sm text-[#4b5563]'>hello@shin-line.com</p>
					</div>
					<div className='rounded-[30px] bg-white p-8 shadow-[0_35px_60px_-30px_rgba(15,23,42,0.35)]'>
						<h3 className='text-xl font-semibold text-[#242f3d] mb-4'>
							По вопросам продаж
						</h3>
						<p className='text-base font-semibold text-[#1f2937]'>
							+7 705 134 26 84
						</p>
					</div>
					<div className='rounded-[30px] bg-white p-8 shadow-[0_35px_60px_-30px_rgba(15,23,42,0.35)]'>
						<h3 className='text-xl font-semibold text-[#242f3d] mb-4'>
							По вопросам качества
						</h3>
						<p className='text-base font-semibold text-[#1f2937] mb-3'>
							+7 771 741 00 50
						</p>
						<p className='text-sm text-[#4b5563]'>hot-line@shin-line.com</p>
					</div>
					<div className='rounded-[30px] bg-white p-8 shadow-[0_35px_60px_-30px_rgba(15,23,42,0.35)]'>
						<h3 className='text-xl font-semibold text-[#242f3d] mb-4'>
							Контактное лицо для СМИ
						</h3>
						<p className='text-base font-semibold text-[#1f2937] mb-3'>
							+7 771 761 04 94
						</p>
						<p className='text-sm text-[#4b5563]'>
							muqtar.elmira@shin-line.com
						</p>
					</div>
					<div className='rounded-[30px] bg-white p-8 shadow-[0_35px_60px_-30px_rgba(15,23,42,0.35)]'>
						<h3 className='text-xl font-semibold text-[#242f3d] mb-4'>
							По вопросам вакансий
						</h3>
						<p className='text-base font-semibold text-[#1f2937] mb-2'>
							+7 771 766 00 78
						</p>
						<p className='text-base font-semibold text-[#1f2937]'>
							+7 771 990 09 70
						</p>
					</div>
				</div>
				<div className='mt-10 grid gap-6 md:grid-cols-3 items-center'>
					<div className='md:col-span-2'>
						<Link
							to='/contacts'
							className='inline-flex items-center justify-center gap-2 rounded-full bg-[#e50909] px-8 py-4 text-base font-semibold text-white shadow-lg shadow-[#e50909]/20 transition hover:bg-[#c10808]'
						>
							Связаться с нами
							<img src='/src/assets/arrow.svg' alt='' className='w-4 h-4' />
						</Link>
					</div>
				</div>
			</div>

			<HomeOfficeMap />
		</div>
	);
};
