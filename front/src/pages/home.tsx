import { Link } from 'react-router'
import cn from "classnames";
import { useState } from "react";

export const Home = () => {
	const [activeIndex, setActiveIndex] = useState(0);

	// Массив с данными для карточек
	const cards = [
		{
			id: 0,
			title: "Мороженное",
			description: "c 1995 года",
			image: "/src/assets/main/hovered-items/icecream.png"
		},
		{
			id: 1,
			title: "Мороженное",
			description: "c 1995 года",
			image: "/src/assets/main/hovered-items/icecream.png"
		},
		{
			id: 2,
			title: "Мороженное",
			description: "c 1995 года",
			image: "/src/assets/main/hovered-items/icecream.png"
		},
		{
			id: 3,
			title: "Мороженное",
			description: "c 1995 года",
			image: "/src/assets/main/hovered-items/icecream.png"
		}
	];

	return (
			<div className='container mx-auto '>
				<img src='/src/assets/main/1main.webp' alt='' />
				<div className=''>
					<img src='/src/assets/main/2main.webp' alt='' />
				</div>
				<div className='flex pb-[70px] mt-[-90px] rounded-t-[90px] bg-white transform-3d'>
					<div className='w-1/2 pt-20 pl-[110px] pr-20'>
						<h1>Группа компаний Шин-Лайн</h1>
						<p>
							Основанная в 1995 году как семейное предприятие, сегодня компания
							стала №1 по производству мороженого в Центральной Азии. В 2025 году
							мы выпустили 37 000 тонн продукции, соответствующей международным
							стандартам качества.
						</p>
						<Link to=''>
							Подробнее <img src='/src/assets/arrow.svg' />
						</Link>
					</div>
					<div className='w-1/2 pt-20 pb-[150px] pl-20 pr-[140px]  bg-[#e4e9f0] rounded-t-[90px] '>
						<ul>
							<li className='-rotate-10 flex  flex-wrap items-center gap-x-[30px] leading-none'>
								<span className='text-[#e50909] text-[100px] font-extrabold'>10</span>
								<span className='max-w-[220px] text-[26px] font-semibold'>Стран импортеров</span>
							</li>
							<li className='-rotate-10 flex  flex-wrap items-center gap-x-[30px] leading-none'>
								<span className='text-[#e50909] text-[100px] font-extrabold'>16</span>
								<span className='max-w-[220px] text-[26px] font-semibold'>Филиалов</span>
							</li>
							<li className='-rotate-10 flex flex-wrap items-center gap-x-[30px] leading-none'>
								<span className='text-[#e50909] text-[100px] font-extrabold'>100</span>
								<span className='max-w-[220px] text-[26px] font-semibold'>Дистрибьюторов</span>
							</li>
							<li className='-rotate-10 flex flex-wrap items-center gap-x-[30px] leading-none'>
								<span className='text-[#e50909] text-[100px] font-extrabold'>130.000</span>
								<span  className=' text-[26px] font-semibold text-end w-2/3'>Точек продаж</span>
							</li>
						</ul>
					</div>
				</div>
				<div className='mt-[-150px] transform-3d bg-white pt-[90px] rounded-t-[90px] pb-20'>
					<h2 className='text-[30px] pl-20 -mt-10'>Направления деятельности</h2>
					<div className='flex mt-10 px-20 gap-x-[20px] max-w-[1800px] w-full'>
						{cards.map((card) => (
								<div
										key={card.id}
										className={cn(
												'relative flex flex-col grow gap-y-5 h-[480px] justify-between pt-[45px] px-5 pb-[25px] transition-all duration-300',
												{
													'!w-[480px] aspect-square': activeIndex === card.id,
													'w-[calc((100%-630px)/3)]': activeIndex !== card.id,
												}
										)}
										onMouseEnter={() => setActiveIndex(card.id)}
								>
									<div className='absolute w-full h-full inset-0'>
										<img
												src={card.image}
												alt=''
												className={cn('object-bottom object-cover w-full h-full rounded-[20px] transition-all duration-300', {
													'rounded-[500px]': activeIndex === card.id,
												})}
										/>
									</div>
									<div className='relative z-10 max-w-[330px] mx-auto text-center'>
										<p>{card.description}</p>
										<h4>{card.title}</h4>
									</div>
								</div>
						))}
					</div>
				</div>
			</div>
	);
};
