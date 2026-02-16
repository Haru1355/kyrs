import { Link } from 'react-router'

export const Home = () => {
	return (
		<div className='container mx-auto '>
			<img src='/src/assets/main/1main.webp' alt='' />
			<div className=''>
				<img src='/src/assets/main/2main.webp' alt='' />
			</div>
			<div className='flex pb-[150px] mt-[-90px] rounded-t-[90px] bg-white transform-3d'>
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
				<div className='w-1/2 py-20 pl-20 pr-[140px]  bg-[#e4e9f0] rounded-t-[90px] '>
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
		</div>
	);
};
