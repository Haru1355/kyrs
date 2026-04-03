import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router';
import { fetchProducts } from '../api/api.ts';
import { ProductItem } from '../componens/product-item/product-item.tsx';
import { Autoplay, Swiper, SwiperSlide } from '../swiper';
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

	// Кэшируем первый продукт каждого бренда для оптимизации
	const brandHeaderMap = useMemo(() => {
		const map = new Map<string, typeof products.data[0]>();
		Object.entries(productsByBrand).forEach(([brandName, brandProducts]) => {
			if (brandProducts.length > 0) {
				map.set(brandName, brandProducts[0]);
			}
		});
		return map;
	}, [productsByBrand]);

	if (loading) {
		return (
			<div className='flex items-center justify-center min-h-[40vh] text-center px-4'>
				<p className='text-lg text-gray-600'>Загружается...</p>
			</div>
		);
	}

	if (error) {
		return (
			<div className='flex items-center justify-center min-h-[40vh] text-center px-4'>
				<p className='text-lg text-red-600'>Ошибка: {error}</p>
			</div>
		);
	}

	return (
		<div className='w-full px-4 sm:px-6 lg:px-8'>
			{/* Баннер */}
			<div className='relative rounded-2xl overflow-hidden'>
				<img src='/src/assets/product/prod.webp' alt='' className='w-full h-auto' />
				<div className='absolute inset-0 flex flex-col w-full sm:w-2/3 justify-center text-white pl-4 sm:pl-8 lg:pl-16 py-8 sm:py-12 lg:py-20'>
					<Link to='' className='font-[cursive] text-xs sm:text-base lg:text-lg mb-2'>
						Главная | Мороженное
					</Link>
					<h1 className='font-[cursive] font-bold text-2xl sm:text-4xl lg:text-6xl leading-tight mb-3 sm:mb-4'>
						Шин-Лайн — мороженое № 1 в&nbsp;Центральной Азии*
					</h1>
					<p className='font-[cursive] text-sm sm:text-lg lg:text-2xl'>
						и один из крупнейших производителей в СНГ и Восточной Европе.
					</p>
				</div>
			</div>

			{/* Бренды */}
			<div className='flex flex-col pb-10 sm:pb-16 lg:pb-[70px] mt-[-30px] sm:mt-[-60px] lg:mt-[-90px] rounded-t-2xl sm:rounded-t-3xl lg:rounded-t-[90px] bg-[#e4e9f0]'>
				<div className='w-full pt-6 sm:pt-10 lg:pt-16 px-4 sm:px-8 lg:px-12'>
					<h2 className='font-[cursive] font-bold text-2xl sm:text-3xl lg:text-4xl text-[#384052] text-center mb-6 sm:mb-10'>
						Наши бренды
					</h2>
					<div className='slide'>
						<Swiper
							modules={[Autoplay]}
							autoplay={{ delay: 2500, disableOnInteraction: false }}
							spaceBetween={20}
							slidesPerView='auto'
							loop={true}
							breakpoints={{
								320: {
									slidesPerView: 2,
								},
								640: {
									slidesPerView: 3,
								},
								768: {
									slidesPerView: 4,
								},
								1024: {
									slidesPerView: 6,
								},
							}}
						>
							{Object.keys(productsByBrand).map(brandName => {
								const brandHeader = brandHeaderMap.get(brandName);
								if (!brandHeader) return null;
								const brand = brandHeader.brand;
								return (
									<SwiperSlide key={brandName}>
										<div className='flex justify-center'>
											<div className='w-20 h-20 sm:w-28 sm:h-28 lg:w-32 lg:h-32 rounded-full overflow-hidden bg-white flex items-center justify-center shadow-lg'>
												<img
													src={`http://localhost:1337${brand.logo.url}`}
													alt={brandName}
													className='w-full h-full object-cover'
												/>
											</div>
										</div>
									</SwiperSlide>
								);
							})}
						</Swiper>
					</div>
				</div>
			</div>

			{/* Продукты */}
			<div className='mb-16 sm:mb-24 lg:mb-32'>
				<h1 className='text-3xl sm:text-5xl lg:text-[74px] font-extrabold mb-8 sm:mb-12'>Мороженное</h1>

		{Object.entries(productsByBrand).map(([brandName, brandProducts]) => (
			<div key={brandName} className='mb-12 sm:mb-16'>
				<h2 className='text-2xl sm:text-4xl lg:text-[52px] font-extrabold my-4 sm:my-6'>{brandName}</h2>
				<ul className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6'>
					{/* Описание бренда */}
					{brandHeaderMap.has(brandName) && (
						<li className='hidden lg:flex flex-col items-center justify-center bg-gray-50 rounded-lg p-4'>
							<img
								src={`http://localhost:1337${brandHeaderMap.get(brandName)?.brand.logo.url}`}
								alt=''
								className='w-24 h-24 sm:w-32 sm:h-32 object-contain mb-4'
							/>
							<p className='text-sm text-center text-gray-600'>{brandHeaderMap.get(brandName)?.brand.description}</p>
						</li>
					)}

					{/* Товары */}
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
