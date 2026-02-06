import type { NewsResponse } from '../types/news';

export const fetchNews = async (): Promise<NewsResponse> => {
	const response = await fetch('http://localhost:1337/api/news?populate=*', {
		method: 'GET',
	});

	if (!response.ok) {
		throw new Error(`HTTP error! status: ${response.status}`);
	}

	return await response.json();
};
