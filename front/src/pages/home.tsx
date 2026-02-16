import { Link } from 'react-router'

export const Home = () => {
	return (
		<div className='container mx-auto '>
			<img src='/src/assets/main/1main.webp' alt='' />
			<div className=''>
				<img src='/src/assets/main/2main.webp' alt='' />
			</div>
			<div className='flex pt-20 pb-[150px] mt-[-90px] rounded-t-[90px] bg-white'>
				<div className='w-1/2  '>
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
				<div className='w-1/2 '>
					<ul>
						<li className='-rotate-10'>
							<span>10</span>
							<span>Стран импортеров</span>
						</li>
						<li className='-rotate-10'>
							<span>16</span>
							<span>Филиалов</span>
						</li>
						<li className='-rotate-10'>
							<span>100</span>
							<span>Дистрибьюторов</span>
						</li>
						<li className='-rotate-10'>
							<span>130.000</span>
							<span>Точек продаж</span>
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
};
