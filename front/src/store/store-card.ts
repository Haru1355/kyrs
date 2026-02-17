import { atomWithStorage } from 'jotai/utils'
import type {IProductItem} from "../types/products.ts";

export interface ICardItem extends IProductItem {
	count: number;
}

export const cardAtom = atomWithStorage<ICardItem[]>('card',[])
