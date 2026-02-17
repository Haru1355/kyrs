import type {MetaData} from "./news.ts";

export interface IProductItem {
	id: number;
	documentId: string;
	title: string;
	content: string;
	createdAt: string;
	updatedAt: string;
	publishedAt: string;
	image:{
		url:string
	}
	priceRub: number;
	priceTen: number;
	name: string;
	weight: number;
	brand: {
		id: number;
		name: string;
		description: string;
		logo: {
			url: string;
		}
	}
	product_category: {
		id: number;
		name: string;
	}
}

// Тип для всего ответа API
export interface ProductsResponse {
	data: IProductItem[];
	meta: MetaData;

}
