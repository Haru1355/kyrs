import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router';
import { fetchProducts } from '../api/api.ts';
import { ProductItem } from '../componens/product-item/product-item.tsx';
import { Autoplay, Swiper, SwiperSlide } from '../swiper';
import type { IProductItem, ProductsResponse } from '../types/products.ts';

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
		const map = new Map<string, IProductItem>();
		Object.entries(productsByBrand).forEach(([brandName, brandProducts]) => {
			if (brandProducts.length > 0) {
				map.set(brandName, brandProducts[0]);
			}
		});
		return map;
	}, [productsByBrand]);

	if (loading) {
		return (
			<div className='flex min-h-[40vh] items-center justify-center px-4 text-center'>
				<p className='text-lg text-gray-600'>Загружается...</p>
			</div>
		);
	}

	if (error) {
		return (
			<div className='flex min-h-[40vh] items-center justify-center px-4 text-center'>
				<p className='text-lg text-red-600'>Ошибка: {error}</p>
			</div>
		);
	}

	return (
		<div className='w-full'>
			{/* Баннер на всю ширину экрана */}
			<div className='relative z-0 w-full overflow-hidden'>
				<img
					src='/src/assets/product/prod.webp'
					alt=''
					className='block h-auto w-full'
				/>
				<div className='absolute inset-0 flex w-full flex-col justify-center px-4 py-8 text-white sm:w-2/3 sm:px-8 sm:py-12 lg:px-16 lg:py-20'>
					<Link to='' className='mb-2 font-[cursive] text-xs sm:text-base lg:text-lg'>
						Главная | Мороженное
					</Link>
					<h1 className='mb-3 font-[cursive] text-2xl font-bold leading-tight sm:mb-4 sm:text-4xl lg:text-6xl'>
						Шин-Лайн — мороженое № 1 в&nbsp;Центральной Азии*
					</h1>
					<p className='font-[cursive] text-sm sm:text-lg lg:text-2xl'>
						и один из крупнейших производителей в СНГ и Восточной Европе.
					</p>
				</div>
			</div>

			{/* Бренды: меньший наезд, чтобы блок со слайдером не перекрывал баннер */}
			<div className='relative z-10 -mt-4 flex flex-col rounded-t-2xl bg-[#e4e9f0] pb-10 sm:-mt-6 sm:rounded-t-3xl sm:pb-16 lg:-mt-8 lg:rounded-t-[90px] lg:pb-[70px]'>
				<div className='w-full px-4 pt-6 sm:px-6 sm:pt-10 lg:px-8 lg:pt-16 xl:px-12'>
					<h2 className='mb-6 text-center font-[cursive] text-2xl font-bold text-[#384052] sm:mb-10 sm:text-3xl lg:text-4xl'>
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
											<div className='flex h-20 w-20 items-center justify-center overflow-hidden rounded-full bg-white sm:h-28 sm:w-28 lg:h-32 lg:w-32'>
												<img
													src={`http://localhost:1337${brand.logo.url}`}
													alt={brandName}
													className='h-full w-full object-cover'
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
			<div className='mb-16 px-4 sm:mb-24 sm:px-6 lg:mb-32 lg:px-8'>
				<h1 className='mb-8 text-3xl font-extrabold sm:mb-12 sm:text-5xl lg:text-[74px]'>
					Мороженное
				</h1>

				{Object.entries(productsByBrand).map(([brandName, brandProducts]) => (
					<div key={brandName} className='mb-12 sm:mb-16'>
						<h2 className='my-4 text-2xl font-extrabold sm:my-6 sm:text-4xl lg:text-[52px]'>
							{brandName}
						</h2>
						<ul className='grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4'>
							{brandHeaderMap.has(brandName) && (
								<li className='hidden flex-col items-center justify-center p-2 lg:flex'>
									<img
										src={`http://localhost:1337${brandHeaderMap.get(brandName)?.brand.logo.url}`}
										alt=''
										className='mb-4 h-40 w-40 shrink-0 overflow-hidden rounded-full bg-white object-contain sm:h-48 sm:w-48 lg:h-52 lg:w-52'
									/>
									<p className='text-center text-sm text-gray-600'>
										{brandHeaderMap.get(brandName)?.brand.description}
									</p>
								</li>
							)}

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
