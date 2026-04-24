/** Ссылка на точку в Яндекс.Картах и виджет для встраивания */
const MAP_LINK = 'https://yandex.com/maps/-/CPGe5OMe';
const MAP_WIDGET_SRC = 'https://yandex.ru/map-widget/v1/-/CPGe5OMe';

export const HomeOfficeMap = () => {
	return (
		<section className='bg-[#f6f7fa] px-4 pb-12 pt-2 sm:px-6 sm:pb-14 md:px-8 md:pb-16 lg:px-20 lg:pb-20'>
			<div className='mx-auto max-w-[1200px]'>
				<h2 className='text-center font-[cursive] text-xl font-bold text-[#1f2937] sm:text-2xl md:text-3xl lg:text-4xl'>
					Шин-Лайн, офис
				</h2>
				<p className='mx-auto mt-2 max-w-2xl text-center text-sm text-[#4b5563] sm:text-base'>
					Алматинская область, Илийский район, с. Байсерке, ул. Султана Бейбариса, 58
				</p>

				<div className='relative mt-6 w-full overflow-hidden rounded-2xl border border-gray-200/80 bg-gray-100 shadow-[0_20px_50px_-24px_rgba(15,23,42,0.25)] sm:mt-8 md:rounded-3xl'>
					{/* Адаптивная высота: соотношение сторон + минимум для мобильных */}
					<div className='relative aspect-[4/3] min-h-[220px] w-full sm:min-h-[280px] md:aspect-video md:min-h-[320px] lg:min-h-[400px]'>
						<iframe
							title='Шин-Лайн, офис — Яндекс.Карты'
							src={MAP_WIDGET_SRC}
							className='absolute inset-0 h-full w-full border-0'
							allowFullScreen
							loading='lazy'
							referrerPolicy='no-referrer-when-downgrade'
						/>
					</div>
				</div>

				<p className='mt-4 text-center'>
					<a
						href={MAP_LINK}
						target='_blank'
						rel='noreferrer'
						className='inline-flex items-center gap-1 text-sm font-semibold text-[#e50909] underline-offset-2 hover:underline sm:text-base'
					>
						Открыть в Яндекс.Картах
						<span aria-hidden>↗</span>
					</a>
				</p>
			</div>
		</section>
	);
};
