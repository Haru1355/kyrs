import { Link } from 'react-router'

export const Header = () => {
	return <header className='flex max-w-[1400px] mx-auto justify-between items-center px-5 my-5 gap-12'> 
		<div className="w-full ">
			<ul className='flex gap-2 justify-between'>
			<li><Link to="">О компании </Link></li>
			<li><Link to="">Бренды</Link></li>
			<li><Link to="">продукция </Link></li>
			<li><Link to="/news">новости </Link></li>
			</ul>
		</div>
		<img className="w-full max-w-[157px] h-[141px]" src="/src/assets/logo.png" alt="logo" />
		<div className="w-full">
			<ul className='flex gap-2 justify-between'>
			<li><Link to="">Благотворительны фонд </Link></li>
			<li><Link to="">Пресса</Link></li>
			<li><Link to="">Доставка</Link></li>
			<li><Link to="">контакты </Link></li>
			</ul>
		</div>
	</header>;
}
