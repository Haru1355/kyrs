// Типы для форматов изображений
export interface ImageFormat {
	name: string;
	hash: string;
	ext: string;
	mime: string;
	path: string | null;
	width: number;
	height: number;
	size: number;
	sizeInBytes: number;
	url: string;
}

// Тип для изображения
export interface ImageData {
	name: string;
	alternativeText: string | null;
	caption: string | null;
	width: number;
	height: number;
	formats: {
		thumbnail: ImageFormat;
		small: ImageFormat;
		medium: ImageFormat;
		large: ImageFormat;
	};
	hash: string;
	ext: string;
	mime: string;
	size: number;
	url: string;
	previewUrl: string | null;
	provider: string;
	provider_metadata: string | null;
	createdAt: string;
	updatedAt: string;
}

// Тип для текстового элемента в content
export interface ContentTextElement {
	type: 'text';
	text: string;
}

// Тип для paragraph
export interface ParagraphContent {
	type: 'paragraph';
	children: ContentTextElement[];
}

// Тип для image
export interface ImageContent {
	type: 'image';
	image: ImageData;
	children: ContentTextElement[];
}

// Объединенный тип для элементов content
export type ContentElement = ParagraphContent | ImageContent;

// Тип для новости
export interface NewsItem {
	id: number;
	documentId: string;
	title: string;
	content: string;
	createdAt: string;
	updatedAt: string;
	publishedAt: string;
	img:{
		url:string
	}
	date:string
	slug:string
}

// Тип для пагинации
export interface Pagination {
	page: number;
	pageSize: number;
	pageCount: number;
	total: number;
}

// Тип для meta
export interface MetaData {
	pagination: Pagination;
}

// Тип для всего ответа API
export interface NewsResponse {
	data: NewsItem[];
	meta: MetaData;

}
export interface OneNewsResponse{
	data:NewsItem[];
	meta: MetaData;
}