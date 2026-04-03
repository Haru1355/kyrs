import {cardAtom, type ICardItem} from "../../store/store-card.ts";
import {useMemo} from "react";
import {Minus, Plus, Trash2} from "lucide-react";
import {useAtom} from "jotai";

export const CardItem = ({product}:{product: ICardItem}) => {
	const [card, setCard] = useAtom(cardAtom)

	const productInCard = useMemo(() => {
		return card.find((item) => item.id === product.id) || null
	}, [card, product]);

	const increment = () => {
		setCard((prev) => {
			return [...prev.filter((i) => i.id !== product.id), {
				...product,
				count: (productInCard?.count || 0) + 1,
			}];
		})
	};
	const decrement = () => {
		setCard((prev) => {
			return [...prev.filter((i) => i.id !== product.id), {
				...product,
				count: Math.max((productInCard?.count || 0) - 1, 1),
			}];
		})
	};

	const handleDelete = () => {
		setCard(prev => prev.filter((i) => i.id !== product.id));
	}

	return (
		<div className='flex flex-col sm:flex-row gap-4 sm:gap-5 border-b pb-4 sm:pb-6 last:border-b-0'>
			<img
				src={`http://localhost:1337${product.image.url}`}
				alt={product.name}
				className='w-full sm:w-24 md:w-32 h-32 sm:h-24 md:h-32 object-cover rounded-lg flex-shrink-0'
			/>
			<div className='flex flex-col justify-between flex-1'>
				<div className='flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3 flex-wrap'>
					<h4 className='text-lg sm:text-xl md:text-2xl font-semibold'>{product.name}</h4>
					<p className='text-sm sm:text-base text-gray-600'>
						{(product.priceRub * product.count).toFixed(2)} Руб. | {(product.priceTen*product.count).toFixed(2)} Тен.
					</p>
				</div>
				<div className='flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 mt-3 sm:mt-0'>
					<div className='flex items-center gap-2 sm:gap-3 bg-gray-100 rounded-lg p-2'>
						<button
							onClick={decrement}
							className='size-8 sm:size-10 rounded-full flex items-center justify-center border border-[#e50909] cursor-pointer text-[#e50909] transition-all duration-200 hover:bg-[#e50909] hover:border-[#e50909] hover:text-white'
						>
							<Minus className='w-4 h-4' />
						</button>
						<p className='text-lg sm:text-2xl font-bold min-w-8 text-center'>{product.count}</p>
						<button
							onClick={increment}
							className='size-8 sm:size-10 rounded-full flex items-center justify-center border border-white bg-[#e50909] cursor-pointer text-white transition-all duration-200 hover:bg-white hover:border-[#e50909] hover:text-[#e50909]'
						>
							<Plus className='w-4 h-4' />
						</button>
					</div>
					<button
						className='flex items-center gap-2 bg-[#e50909] text-white rounded-lg px-3 sm:px-4 py-2 font-bold cursor-pointer transition-all duration-200 hover:bg-white hover:border hover:border-[#e50909] hover:text-[#e50909] text-sm sm:text-base'
						onClick={handleDelete}
					>
						Удалить <Trash2 className='w-4 h-4' />
					</button>
				</div>
			</div>
		</div>
	)
}
