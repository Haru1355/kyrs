import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { fetchOneNews } from '../api/api';
import { Content } from '../componens/content/content';
import type { OneNewsResponse } from '../types/news';

const formatter = new Intl.DateTimeFormat('ru-RU', {
	day: 'numeric',
	month: 'long',
	year: 'numeric',
	timeZone: 'UTC',
});

export const NewsPage = () => {
	const { slug } = useParams();
	const [news, setNews] = useState<OneNewsResponse | null>(null);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				setLoading(true);
				const result = await fetchOneNews(slug || '');
				setNews(result);
			} catch (err) {
				setError(err instanceof Error ? err.message : 'An error occurred');
				console.error('Error fetching news:', err);
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, [slug]);

	if (loading || !news?.data) {
		return <div className='text-center py-10'>Загрузка...</div>;
	}

	if (error) {
		return (
			<div className='text-center py-10 text-red-600'>Ошибка: {error}</div>
		);
	}

	return (
		<div className='bg-[#f4f6f9] rounded-t-[30px] md:rounded-t-[90px] p-4 md:p-10 lg:p-20 mt-[-40px] md:mt-[-55px]'>
			<article className='w-full'>
				<h1 className='text-2xl sm:text-3xl md:text-4xl lg:text-[40px] text-[#1a1a1a] px-2 md:px-0 font-bold'>
					{news?.data[0].title}
				</h1>
				<p className='text-[#0000007e] text-sm md:text-base px-2 md:px-0 mt-3 md:mt-2 border-b border-[#38405233] pb-3 md:pb-4'>
					{formatter.format(new Date(news.data[0].date))}
				</p>
				<Content content={news.data[0].content} />
			</article>
		</div>
	);
};
