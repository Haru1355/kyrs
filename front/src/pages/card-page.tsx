import { useAtom } from 'jotai';
import { Controller, useForm } from 'react-hook-form';
import { CardItem } from '../componens/card-item/card-item.tsx';
import { cardAtom } from '../store/store-card.ts';

export type OrderForm = {
	name: string;
	phone: string;
	email: string;
	addres: string;
};

export const CardPage = () => {
	const [card] = useAtom(cardAtom);
	const { control, handleSubmit } = useForm<OrderForm>();

	const sumRub = card
		.reduce((acc, item) => acc + item.count * item.priceRub, 0)
		.toFixed(2);
	const sumTen = card
		.reduce((acc, item) => acc + item.count * item.priceTen, 0)
		.toFixed(2);

	const onSubmit = async (data: OrderForm) => {
		try {
			await fetch('http://localhost:1337/api/orders', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					data: {
						name: data.name,
						phone: data.phone,
						email: data.email,
						addres: data.addres,
						products: card.map(item => {
							return {
								count: item.count,
								product: { connect: { documentId: item.documentId } },
								displayname: `${item.name} - ${item.count}`,
							};
						}),
						sumRub,
						sumTen,
						compleate: false,
					},
				}),
			});
			alert('Заказ успешно оформлен!');
		} catch (e) {
			console.error('Ошибка при оформлении заказа:', e);
			alert('Ошибка при оформлении заказа');
		}
	};

	return (
		<div className='w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12 mb-8 sm:mb-16 lg:mb-24'>
			<div className='w-full'>
				<h1 className='text-3xl sm:text-4xl lg:text-5xl font-bold mb-8 sm:mb-10'>Корзина</h1>

				<div className='flex flex-col lg:flex-row gap-6 md:gap-8 lg:gap-12'>
					{/* Список товаров */}
					<div className='w-full lg:w-2/3 flex flex-col gap-2 sm:gap-4'>
						{card.length === 0 ? (
							<div className='text-center py-12 sm:py-16 text-gray-500 text-base sm:text-lg'>
								Корзина пуста
							</div>
						) : (
							card
								.sort((a, b) => a.id - b.id)
								.map(item => <CardItem product={item} key={item.id} />)
						)}
					</div>

					{/* Форма заказа */}
					<form
						className='w-full lg:w-1/3 border border-[#e50909] p-6 sm:p-8 lg:p-10 rounded-2xl lg:sticky lg:top-24 h-fit'
						onSubmit={handleSubmit(onSubmit)}
					>
						<h2 className='text-center text-[#e50909] text-xl sm:text-2xl font-bold mb-6 sm:mb-8'>
							Оформить заказ
						</h2>

						<div className='flex flex-col gap-4 sm:gap-5'>
							{/* ФИО */}
							<Controller
								render={({ field }) => {
									return (
										<input
											{...field}
											className='outline-0 border-b border-[#e50909] w-full px-2 py-2 placeholder:text-[#e50909] text-[#e50909] text-sm sm:text-base transition-colors focus:bg-red-50'
											placeholder='ФИО'
											required
										/>
									);
								}}
								name='name'
								control={control}
							/>

							{/* Телефон */}
							<Controller
								render={({ field }) => {
									return (
										<input
											{...field}
											className='outline-0 border-b border-[#e50909] w-full px-2 py-2 placeholder:text-[#e50909] text-[#e50909] text-sm sm:text-base transition-colors focus:bg-red-50'
											placeholder='Телефон'
											type='tel'
											required
										/>
									);
								}}
								name='phone'
								control={control}
							/>

							{/* Почта */}
							<Controller
								render={({ field }) => {
									return (
										<input
											{...field}
											className='outline-0 border-b border-[#e50909] w-full px-2 py-2 placeholder:text-[#e50909] text-[#e50909] text-sm sm:text-base transition-colors focus:bg-red-50'
											placeholder='Почта'
											type='email'
											required
										/>
									);
								}}
								name='email'
								control={control}
							/>

							{/* Адрес */}
							<Controller
								render={({ field }) => {
									return (
										<input
											{...field}
											className='outline-0 border-b border-[#e50909] w-full px-2 py-2 placeholder:text-[#e50909] text-[#e50909] text-sm sm:text-base transition-colors focus:bg-red-50'
											placeholder='Адрес'
											required
										/>
									);
								}}
								name='addres'
								control={control}
							/>

							{/* Итоговая сумма */}
							<div className='border-t border-[#e50909] pt-4 sm:pt-6 mt-3 sm:mt-4'>
								<p className='text-[#e50909] font-bold text-sm sm:text-base mb-2'>
									Итого:
								</p>
								<p className='text-[#e50909] font-bold text-base sm:text-lg break-words'>
									{sumRub} Руб. | {sumTen} Тен.
								</p>
							</div>

							{/* Кнопка оформления */}
							<button
								type='submit'
								className='border border-[#e50909] py-2 sm:py-3 px-4 text-[#e50909] rounded-2xl font-bold cursor-pointer text-sm sm:text-base transition-all duration-200 hover:bg-[#e50909] hover:text-white w-full'
							>
								Оформить
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};
