import {Minus, Plus} from "lucide-react";
import {useMemo, useState} from "react";
import type {IProductItem} from "../../types/products.ts";
import {cardAtom} from "../../store/store-card.ts";
import {useAtom} from "jotai";

export const ProductItem = ({ product }: { product: IProductItem }) => {
	const [count, setCount] = useState(1);

	const increment = () => {
		setCount(prev => prev + 1)
	};
	const decrement = () => {
		setCount(prev => Math.max(1, prev - 1))
	};

	const [cardItems, setCardItems] = useAtom(cardAtom)

	const productInCard = useMemo(() => {
		return cardItems.find((item) => item.id === product.id) || null
	}, [cardItems, product.id]);

	const handleAddCardItem = () => {
		if(productInCard){
			setCount(1)
			setCardItems((prev) => {
				return [...prev.filter((i) => i.id !== product.id), {
					...product,
					count: productInCard.count + count,
				}];
			})
		} else {
			setCount(1)
			setCardItems((prev) => [...prev, {
				...product,
				count: count,
			}])
		}
	}

	return (
			<li>
				<img src={`http://localhost:1337${product.image.url}`} alt=''/>
				<p className='my-2'>{product.name}</p>
				<div className='flex justify-between my-2'>
					<p>{product.weight} г.</p>
					<div className='flex gap-2'>
						<p>{product.priceRub} Руб.</p> | <p>{product.priceTen} Тен.</p>
					</div>
				</div>
				<div className='flex justify-between'>
					<button className='px-4 py-2 bg-[#e50909] text-white rounded-xl font-bold cursor-pointer transition-all duration-200 border hover:bg-white hover:border-[#e50909] hover:text-[#e50909]' onClick={handleAddCardItem}>В корзину</button>
					<div className='flex items-center gap-3'>
						<button
								onClick={decrement}
								className='size-10 rounded-full flex items-center justify-center border border-[#e50909] cursor-pointer text-[#e50909] transition-all duration-200 hover:bg-[#e50909] hover:border-[#e50909] hover:text-white'
						>
							<Minus />
						</button>
						<p className='text-2xl'>{count}</p>
						<button
								onClick={increment}
								className='size-10 rounded-full flex items-center justify-center border border-white bg-[#e50909] cursor-pointer text-white transition-all duration-200 hover:bg-white hover:border-[#e50909] hover:text-[#e50909]'
						>
							<Plus />
						</button>
					</div>
				</div>
			</li>
	);
};


