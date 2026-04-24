import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router';
import { fetchNews } from '../../api/api';
import type { NewsItem } from '../../types/news';

const dateFormatter = new Intl.DateTimeFormat('ru-RU', {
	day: 'numeric',
	month: 'long',
	year: 'numeric',
	timeZone: 'UTC',
});

const API_ORIGIN = 'http://localhost:1337';

function getPerPage(width: number): number {
	if (width >= 1280) return 4;
	if (width >= 1024) return 3;
	if (width >= 640) return 2;
	return 1;
}

export const HomeNewsSection = () => {
	const [items, setItems] = useState<NewsItem[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [start, setStart] = useState(0);
	const [perPage, setPerPage] = useState(() =>
		typeof window !== 'undefined' ? getPerPage(window.innerWidth) : 1,
	);

	const updatePerPage = useCallback(() => {
		setPerPage(getPerPage(window.innerWidth));
	}, []);

	useEffect(() => {
		updatePerPage();
		window.addEventListener('resize', updatePerPage);
		return () => window.removeEventListener('resize', updatePerPage);
	}, [updatePerPage]);

	useEffect(() => {
		let cancelled = false;
		(async () => {
			try {
				setLoading(true);
				const res = await fetchNews();
				if (!cancelled) {
					setItems(res.data ?? []);
					setError(null);
				}
			} catch (e) {
				if (!cancelled) {
					setError(e instanceof Error ? e.message : 'Ошибка загрузки');
					setItems([]);
				}
			} finally {
				if (!cancelled) setLoading(false);
			}
		})();
		return () => {
			cancelled = true;
		};
	}, []);

	useEffect(() => {
		const maxStart = Math.max(0, items.length - perPage);
		setStart(s => Math.min(s, maxStart));
	}, [items.length, perPage]);

	const visible = items.slice(start, start + perPage);
	const canPrev = start > 0;
	const canNext = start + perPage < items.length;

	if (error || (!loading && items.length === 0)) {
		return null;
	}

	return (
		<section className='bg-[#eef1f6] py-10 sm:py-12 md:py-14 lg:py-16 px-4 sm:px-6 md:px-8 lg:px-20'>
			<div className='mx-auto max-w-[1400px]'>
				<div className='flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between'>
					<h2 className='text-2xl sm:text-3xl md:text-4xl font-bold text-[#1f2937]'>
						Новости компании
					</h2>
					<Link
						to='/news'
						className='inline-flex shrink-0 items-center gap-2 self-start rounded-full border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-[#1f2937] transition hover:border-gray-400 hover:bg-gray-50 sm:self-auto'
					>
						Все новости
						<span className='text-[#e50909]' aria-hidden>
							↗
						</span>
					</Link>
				</div>

				{loading ? (
					<div className='mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
						{Array.from({ length: 4 }).map((_, i) => (
							<div
								key={i}
								className='animate-pulse overflow-hidden rounded-2xl bg-white shadow-md'
							>
								<div className='aspect-[16/10] bg-gray-200' />
								<div className='space-y-3 p-4'>
									<div className='h-3 w-24 rounded bg-gray-200' />
									<div className='h-4 w-full rounded bg-gray-200' />
									<div className='h-4 w-2/3 rounded bg-gray-200' />
								</div>
							</div>
						))}
					</div>
				) : (
					<>
						<div className='mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
							{visible.map(item => (
								<article
									key={item.id}
									className='flex flex-col overflow-hidden rounded-2xl bg-white shadow-[0_8px_30px_-12px_rgba(15,23,42,0.18)] transition hover:shadow-[0_12px_40px_-12px_rgba(15,23,42,0.22)]'
								>
									<Link to={`/news/${item.slug}`} className='block shrink-0'>
										<img
											src={`${API_ORIGIN}${item.img?.url ?? ''}`}
											alt=''
											className='aspect-[16/10] w-full object-cover'
										/>
									</Link>
									<div className='flex flex-1 flex-col p-4 sm:p-5'>
										<time
											dateTime={item.date}
											className='text-xs text-gray-500 sm:text-sm'
										>
											{dateFormatter.format(new Date(item.date))}
										</time>
										<h3 className='mt-2 line-clamp-3 flex-1 text-sm font-bold leading-snug text-[#1f2937] sm:text-base'>
											<Link
												to={`/news/${item.slug}`}
												className='hover:text-[#e50909] transition-colors'
											>
												{item.title}
											</Link>
										</h3>
										<Link
											to={`/news/${item.slug}`}
											className='mt-4 inline-flex text-sm font-semibold text-[#e50909] hover:underline'
										>
											Подробнее
										</Link>
									</div>
								</article>
							))}
						</div>

						{items.length > perPage && (
							<div className='mt-8 flex justify-center gap-3'>
								<button
									type='button'
									aria-label='Предыдущие новости'
									disabled={!canPrev}
									onClick={() => canPrev && setStart(s => Math.max(0, s - perPage))}
									className='grid h-12 w-12 place-items-center rounded-full border-0 text-white transition disabled:cursor-not-allowed disabled:bg-[#e8e4e6] disabled:text-gray-400 enabled:bg-[#e50909] enabled:hover:opacity-90'
								>
									<ChevronLeft className='h-6 w-6' />
								</button>
								<button
									type='button'
									aria-label='Следующие новости'
									disabled={!canNext}
									onClick={() =>
										canNext &&
										setStart(s => Math.min(items.length - perPage, s + perPage))
									}
									className='grid h-12 w-12 place-items-center rounded-full border-0 text-white transition disabled:cursor-not-allowed disabled:bg-[#e8e4e6] disabled:text-gray-400 enabled:bg-[#e50909] enabled:hover:opacity-90'
								>
									<ChevronRight className='h-6 w-6' />
								</button>
							</div>
						)}
					</>
				)}
			</div>
		</section>
	);
};
