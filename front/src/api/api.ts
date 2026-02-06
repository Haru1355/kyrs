import type { NewsResponse, OneNewsResponse } from '../types/news';

export const fetchNews = async (): Promise<NewsResponse> => {
	const response = await fetch('http://localhost:1337/api/news?populate=*', {
		method: 'GET',
	});

	if (!response.ok) {
		throw new Error(`HTTP error! status: ${response.status}`);
	}

	return await response.json();
};
export const fetchOneNews = async (slug:string): Promise<OneNewsResponse>=>{
	const response = await fetch(`http://localhost:1337/api/news?filters[slug][$eq]=${slug}&populate[img][populate]=*`, {
		method: 'GET',
	});

	if (!response.ok) {
		throw new Error(`HTTP error! status: ${response.status}`);
	}

	return await response.json();
}
