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
						sumRub: card
							.reduce((acc, item) => acc + item.count * item.priceRub, 0)
							.toFixed(2),
						sumTen: card
							.reduce((acc, item) => acc + item.count * item.priceTen, 0)
							.toFixed(2),
						compleate: false,
					},
				}),
			});
		} catch (e) {
			console.log(e);
		}
	};

	return (
		<div className='container mx-auto px-20 mb-32 relative flex'>
			<div className='w-2/3 flex flex-col gap-4'>
				{card
					.sort((a, b) => a.id - b.id)
					.map(item => (
						<CardItem product={item} key={item.id} />
					))}
			</div>
			<form
				className='w-1/3 fixed border border-[#e50909] top-[18%] right-20 p-10 rounded-2xl'
				onSubmit={handleSubmit(onSubmit)}
			>
				<h1 className='text-center text-[#e50909] text-2xl font-bold'>
					Оформить заказ
				</h1>
				<div className='flex flex-col w-3/4 mx-auto gap-y-5 mt-5'>
					<Controller
						render={({ field }) => {
							return (
								<input
									{...field}
									className='outline-0 border-b border-[#e50909] w-full placeholder:text-[#e50909] placeholder:pl-2 text-[#e50909]'
									placeholder='ФИО'
								/>
							);
						}}
						name='name'
						control={control}
					/>
					<Controller
						render={({ field }) => {
							return (
								<input
									{...field}
									className='outline-0 border-b border-[#e50909] w-full placeholder:text-[#e50909] placeholder:pl-2 text-[#e50909]'
									placeholder='Телефон'
								/>
							);
						}}
						name='phone'
						control={control}
					/>
					<Controller
						render={({ field }) => {
							return (
								<input
									{...field}
									className='outline-0 border-b border-[#e50909] w-full placeholder:text-[#e50909] placeholder:pl-2 text-[#e50909]'
									placeholder='Почта'
								/>
							);
						}}
						name='email'
						control={control}
					/>
					<Controller
						render={({ field }) => {
							return (
								<input
									{...field}
									className='outline-0 border-b border-[#e50909] w-full placeholder:text-[#e50909] placeholder:pl-2 text-[#e50909]'
									placeholder='Адрес'
								/>
							);
						}}
						name='addres'
						control={control}
					/>
					<p className='text-[#e50909] font-bold'>
						Сумма:{' '}
						{card
							.reduce((acc, item) => acc + item.count * item.priceRub, 0)
							.toFixed(2)}{' '}
						Руб. |{' '}
						{card
							.reduce((acc, item) => acc + item.count * item.priceTen, 0)
							.toFixed(2)}{' '}
						Тен.
					</p>
					<button className='border border-[#e50909] py-2 text-[#e50909] rounded-2xl font-bold cursor-pointer'>
						Оформить
					</button>
				</div>
			</form>
		</div>
	);
};
