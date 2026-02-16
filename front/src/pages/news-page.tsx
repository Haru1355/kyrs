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
				const result = await fetchOneNews(slug);
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

	if (loading || !news?.data) {
		return <div>Loading...</div>;
	}

	if (error) {
		return <div>Error: {error}</div>;
	}
	console.log(news);
	return (
		<div className='bg-[#f4f6f9] rounded-t-[90px] p-20 mt-[-55px]'>
			<article>
	    	
				<h1 className='text-[40px] text-[#1a1a1a]  pl-2 font-bold'>
					{news?.data[0].title}
				</h1>
			{
					<p className='text-[#0000007e] text-[16px] ml-2 mt-2 border-b-1 border-[#38405233]'>
						{formatter.format(new Date(news.data[0].date))}
					</p>
				}
				<Content content={news.data[0].content} />
			</article>
		</div>
	);
};
