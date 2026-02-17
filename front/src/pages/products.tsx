import {useEffect, useState, useMemo} from "react";
import { fetchProducts} from "../api/api.ts";
import type {ProductsResponse} from "../types/products.ts";
import {ProductItem} from "../componens/product-item/product-item.tsx";

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

		return products.data.reduce((acc, product) => {
			const brandName = product.brand.name;

			if (!acc[brandName]) {
				acc[brandName] = [];
			}

			acc[brandName].push(product);
			return acc;
		}, {} as Record<string, typeof products.data>);
	}, [products]);

	if (loading) {
		return <div>Loading...</div>;
	}

	if (error) {
		return <div>Error: {error}</div>;
	}

	return (
			<div className='container mx-auto px-20 mb-32'>
				<h1 className='text-[74px] font-extrabold'>Мороженное</h1>
				{Object.entries(productsByBrand).map(([brandName, brandProducts]) => (
						<div key={brandName}>
							<h2 className='text-[52px] font-extrabold my-5'>{brandName}</h2>
							<ul className='grid grid-cols-4 gap-5'>
								<li>
									<img src={`http://localhost:1337${brandProducts[0].brand.logo.url}`} alt=''/>
									<p>{brandProducts[0].brand.description}</p>
								</li>
								{brandProducts.map(product => (
										<ProductItem key={product.id} product={product} />
								))}
							</ul>
						</div>
				))}
			</div>
	);
};
