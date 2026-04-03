import {Minus, Plus} from "lucide-react";
import {useMemo, useState} from "react";
import type {IProductItem} from "../../types/products.ts";
import {cardAtom} from "../../store/store-card.ts";
import {useAtom} from "jotai";

export const ProductItem = ({ product }: { product: IProductItem }) => {
	const [count, setCount] = useState(1);
	const [cardItems, setCardItems] = useAtom(cardAtom);

	const productInCard = useMemo(() => {
		return cardItems.find((item) => item.id === product.id) || null
	}, [cardItems, product.id]);

	const increment = () => {
		setCount(prev => prev + 1)
	};

	const decrement = () => {
		setCount(prev => Math.max(1, prev - 1))
	};

	const handleAddCardItem = () => {
		setCardItems((prev) => {
			const existing = prev.find((item) => item.id === product.id);

			if(existing){
				return prev.map((item) =>
					item.id === product.id
						? { ...item, count: item.count + count }
						: item
				);
			} else {
				return [...prev, { ...product, count }];
			}
		});

		setCount(1);
	}

	return (
		<li className='flex flex-col h-full'>
			<img
				src={`http://localhost:1337${product.image.url}`}
				alt={product.name}
				className='w-full h-40 sm:h-48 object-cover rounded-lg mb-2'
			/>
			<p className='my-2 line-clamp-2 text-sm sm:text-base font-medium flex-grow'>{product.name}</p>
			<div className='flex flex-col sm:flex-row justify-between gap-2 my-2 text-xs sm:text-sm'>
				<p className='font-medium'>{product.weight} г.</p>
				<div className='flex gap-2 flex-wrap'>
					<p className='font-medium'>{product.priceRub} Руб.</p>
					<span className='hidden sm:inline'>|</span>
					<p className='font-medium'>{product.priceTen} Тен.</p>
				</div>
			</div>
			<div className='flex flex-col sm:flex-row justify-between gap-2 sm:gap-3 mt-auto'>
				<button
					className='px-3 sm:px-4 py-2 bg-[#e50909] text-white text-sm sm:text-base rounded-xl font-bold cursor-pointer transition-all duration-200 border hover:bg-white hover:border-[#e50909] hover:text-[#e50909] flex-1'
					onClick={handleAddCardItem}
				>
					В корзину
				</button>
				<div className='flex items-center gap-2 sm:gap-3 bg-gray-100 rounded-lg p-2'>
					<button
						onClick={decrement}
						className='size-8 sm:size-10 rounded-full flex items-center justify-center border border-[#e50909] cursor-pointer text-[#e50909] transition-all duration-200 hover:bg-[#e50909] hover:border-[#e50909] hover:text-white'
					>
						<Minus className='w-4 h-4' />
					</button>
					<p className='text-lg sm:text-2xl font-bold min-w-8 text-center'>{count}</p>
					<button
						onClick={increment}
						className='size-8 sm:size-10 rounded-full flex items-center justify-center border border-white bg-[#e50909] cursor-pointer text-white transition-all duration-200 hover:bg-white hover:border-[#e50909] hover:text-[#e50909]'
					>
						<Plus className='w-4 h-4' />
					</button>
				</div>
			</div>
		</li>
	);
};
