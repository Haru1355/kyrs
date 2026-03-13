import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router';
import { fetchProducts } from '../api/api.ts';
import { ProductItem } from '../componens/product-item/product-item.tsx';
import type { ProductsResponse } from '../types/products.ts';

export const ProductsPage = () => {
	const [products, setProducts] = useState<ProductsResponse | null>(null);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				setLoading(true);
				const result = await fetchProducts();
				setProducts(result);
			} catch (err) {
				setError(err instanceof Error ? err.message : 'An error occurred');
				console.error('Error fetching news:', err);
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, []);

	// Группируем продукты по брендам
	const productsByBrand = useMemo(() => {
		if (!products?.data) return {};

		return products.data.reduce(
			(acc, product) => {
				const brandName = product.brand.name;

				if (!acc[brandName]) {
					acc[brandName] = [];
				}

				acc[brandName].push(product);
				return acc;
			},
			{} as Record<string, typeof products.data>,
		);
	}, [products]);

	if (loading) {
		return <div>Loading...</div>;
	}

	if (error) {
		return <div>Error: {error}</div>;
	}

	return (
		<div className='container mx-auto -mt-5 '>
			<div className='relative'>
				<img src='/src/assets/product/prod.webp' alt='' className='w-full' />
				<div className='absolute inset-0 flex flex-col  w-1/2 justify-center text-white ml-15 mb-25'>
					<Link to='' className='font-[cursive] text-xl '>
						Главная|Мороженное <img className='' src='' />
					</Link>
					<h1 className='md font-[cursive] font-bold text-[60px]'>
						Шин-Лайн — мороженое № 1 в&nbsp;Центральной Азии*
					</h1>
					<p className='font-[cursive] text-2xl'>
						и один из крупнейших производителей в СНГ и Восточной Европе.
					</p>
				</div>
			</div>
			<div className='flex pb-[70px] mt-[-90px] rounded-t-[90px] bg-[#e4e9f0] transform-3d'>
				<div className=' pt-10 pl-[520px] '>
					<h2 className='md font-[cursive] font-bold text-[40px] text-[#384052] '>
						Наши бренды
					</h2>
					<div className="slide">
						<div className="">
							
						</div>
					</div>
				</div>
			</div>
			<div className=' mx-auto px-20 mb-32'>
				<h1 className='text-[74px] font-extrabold'>Мороженное</h1>
				{Object.entries(productsByBrand).map(([brandName, brandProducts]) => (
					<div key={brandName}>
						<h2 className='text-[52px] font-extrabold my-5'>{brandName}</h2>
						<ul className='grid grid-cols-4 gap-5'>
							<li>
								<img
									src={`http://localhost:1337${brandProducts[0].brand.logo.url}`}
									alt=''
								/>
								<p>{brandProducts[0].brand.description}</p>
							</li>
							{brandProducts.map(product => (
								<ProductItem key={product.id} product={product} />
							))}
						</ul>
					</div>
				))}
			</div>
		</div>
	);
};
