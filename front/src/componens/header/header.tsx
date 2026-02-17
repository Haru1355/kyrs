import { Link } from 'react-router';
import {ShoppingCart} from "lucide-react";
import {useAtomValue} from "jotai";
import {cardAtom} from "../../store/store-card.ts";

export const Header = () => {
	const card = useAtomValue(cardAtom)
	return (
		<header className='flex max-w-100% mx-auto justify-between items-center px-5 my-5 gap-12 '>
			<Link to='/'><img
				className='w-full max-w-[157px] h-[141px]'
				src='/src/assets/logo.svg'
				alt='logo'
			/></Link>
			<div className=' w-full justify-center text-gray-600'>
				<ul className='flex gap-2 justify-between'>
					<li className='flex items-center justify-center'>
						<Link to='/products'>Продукты </Link>
					</li>
					<li className='flex items-center justify-center'>
						<Link to=''>Магазины CU</Link>
					</li>
					<li className='flex items-center justify-center'>
						<Link to=''>О компании </Link>
					</li>
					<li className='flex items-center justify-center'>
						<Link to='/news'>Новости </Link>
					</li>
					<li className='flex items-center justify-center'>
						<Link to="">Карьера </Link>
					</li>
					<li className='flex items-center justify-center'>
						<Link to=''>Контакты </Link>
					</li>
					<li className='flex items-center justify-center'>
						<Link to='' >Доставка Алматы </Link>
					</li>
					<li className='w-22'>
						<Link to='/card' className='text-white border bg-[#e50909] flex items-center justify-center max-w-max p-3 rounded-full relative'>
								<div className='absolute top-0 bg-white text-[#e50909] text-xs aspect-square size-4 flex items-center justify-center rounded-full right-0 border font-bold'>{card.reduce((acc, item) => acc + item.count,0)}</div>
							<div className=''>
								<ShoppingCart />
							</div>
						</Link>
					</li>
				</ul>
			</div>
		</header>
	);
};
