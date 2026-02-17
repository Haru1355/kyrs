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
			<div className='flex gap-5'>
				<img src={`http://localhost:1337${product.image.url}`} className='size-32'/>
				<div className='flex flex-col justify-between'>
					<div className='flex items-center gap-3 flex-wrap'>
						<h4 className='text-2xl'>{product.name}</h4>
						<p className='pt-1'>{(product.priceRub * product.count).toFixed(2)} Руб. | {(product.priceTen*product.count).toFixed(2)} Тен.</p>
					</div>
					<div className='flex items-center gap-3'>
						<button
								onClick={decrement}
								className='size-10 rounded-full flex items-center justify-center border border-[#e50909] cursor-pointer text-[#e50909] transition-all duration-200 hover:bg-[#e50909] hover:border-[#e50909] hover:text-white'
						>
							<Minus />
						</button>
						<p className='text-2xl'>{product.count}</p>
						<button
								onClick={increment}
								className='size-10 rounded-full flex items-center justify-center border border-white bg-[#e50909] cursor-pointer text-white transition-all duration-200 hover:bg-white hover:border-[#e50909] hover:text-[#e50909]'
						>
							<Plus />
						</button>
					</div>
					<button className='flex bg-[#e50909] text-white rounded-xl font-bold cursor-pointer max-w-max px-4 py-2 justify-between border gap-2 transition-all duration-200 hover:bg-white hover:border-[#e50909] hover:text-[#e50909]' onClick={handleDelete}>Удалить <Trash2 /></button>
				</div>
			</div>
	)
}
