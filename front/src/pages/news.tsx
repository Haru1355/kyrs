import { useEffect, useState } from 'react';
import { fetchNews } from '../api/api';
import type { NewsResponse } from '../types/news';
import { Link } from 'react-router';
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
		return <div>Loading...</div>;
	}

	if (error) {
		return <div>Error: {error}</div>;
	}
	console.log(news?.data);
	return (
		<div className=''>
			<h1 className='text-[70px] font-extrabold mb-10'>Новости</h1> 
			<div className="flex flex-col gap-[90px]">
			{news?.data.map(item => {
				console.log(item.img.url);
				return <Link to={`/news/${item.slug}`} className='flex justify-between gap-2 h-80 w-full'> 
					<img className="w-[45%] h-full object-cover rounded-[20px] " src={`http://localhost:1337${item.img.url}`} alt="" />
					<div className="h-full w-[2px] bg-[#38405233]"></div>
					<div className="w-[45%] flex-col flex justify-between">
						<p className='text-[#38405280] text-2xl'>{formatter.format(new Date(item.date))}</p>
					<h2 className='text-2xl mb-28 font-extrabold text-[#384052]'>{item.title}</h2>
					<button className='px-[25px] py-3 border-[#38405233] border rounded-full max-w-max cursor-pointer hover:bg-[#e50909] hover:text-white transition-all duration-200'>Подробнее</button>
					</div>
				</Link>;
			})}
			</div>
		</div>
	);
};
