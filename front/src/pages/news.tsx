import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { fetchNews } from '../api/api';
import type { NewsResponse } from '../types/news';
// eslint-disable-next-line react-refresh/only-export-components
const formatter = new Intl.DateTimeFormat('ru-RU', {
	day: 'numeric',
	month: 'long',
	year: 'numeric',
	timeZone: 'UTC',
});

export const News = () => {
	const [news, setNews] = useState<NewsResponse | null>(null);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				setLoading(true);
				const result = await fetchNews();
				setNews(result);
			} catch (err) {
				setError(err instanceof Error ? err.message : 'An error occurred');
				console.error('Error fetching news:', err);
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, []);

	if (loading) {
		return <div className='text-center py-10'>Загрузка...</div>;
	}

	if (error) {
		return (
			<div className='text-center py-10 text-red-600'>Ошибка: {error}</div>
		);
	}

	return (
		<div className='bg-[#f4f6f9] rounded-t-[30px] md:rounded-t-[90px] p-4 md:p-10 lg:p-20 mt-[-40px] md:mt-[-55px]'>
			<h1 className='text-2xl sm:text-4xl md:text-5xl lg:text-[70px] font-extrabold mb-6 md:mb-10'>
				Новости
			</h1>

			<div className='flex flex-col gap-6 md:gap-12 lg:gap-[90px]'>
				{news?.data.map(item => {
					return (
						<Link
							key={item.id}
							to={`/news/${item.slug}`}
							className='flex flex-col md:flex-row justify-between gap-4 md:gap-2 md:h-80 w-full hover:opacity-80 transition-opacity'
						>
							{/* Изображение */}
							<img
								className='w-full md:w-[45%] h-48 md:h-full object-cover rounded-[15px] md:rounded-[20px] max-w-full'
								src={`http://localhost:1337${item.img.url}`}
								alt={item.title}
							/>

							{/* Разделитель */}
							<div className='hidden md:block h-full w-[2px] bg-[#38405233]'></div>

							{/* Информация */}
							<div className='w-full md:w-[45%] flex flex-col justify-between'>
								<p className='text-[#38405280] text-sm md:text-lg lg:text-2xl'>
									{formatter.format(new Date(item.date))}
								</p>

								<h2 className='text-lg sm:text-xl md:text-2xl lg:text-2xl mb-4 md:mb-28 font-extrabold text-[#384052] line-clamp-3 md:line-clamp-none'>
									{item.title}
								</h2>

								<button className='px-5 md:px-[25px] py-2 md:py-3 border-[#38405233] border rounded-full max-w-max cursor-pointer text-sm md:text-base hover:bg-[#e50909] hover:text-white hover:border-[#e50909] transition-all duration-200'>
									Подробнее
								</button>
							</div>
						</Link>
					);
				})}
			</div>
		</div>
	);
};
