import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkBreaks from 'remark-breaks';
import remarkGfm from 'remark-gfm';

export const Content = ({ content }: { content: string }) => {
	return (
		<div className='prose prose-sm md:prose-base max-w-none mt-6 md:mt-8 px-2 md:px-0'>
			<ReactMarkdown
				remarkPlugins={[remarkGfm, remarkBreaks]}
				rehypePlugins={[rehypeRaw]}
				components={{
					del: ({ children, ...props }) => (
						<s style={{ textDecoration: 'line-through' }} {...props}>
							{children}
						</s>
					),
					em: ({ children, ...props }) => (
						<i style={{ fontStyle: 'italic' }} {...props}>
							{children}
						</i>
					),
					strong: ({ children, ...props }) => (
						<b style={{ fontWeight: 'bold' }} {...props}>
							{children}
						</b>
					),
					u: ({ children, ...props }) => (
						<u style={{ textDecoration: 'underline' }} {...props}>
							{children}
						</u>
					),
					blockquote: ({ children, ...props }) => (
						<blockquote
							className='border-l-4 border-[#e50909] pl-4 md:pl-5 py-2 my-4 md:my-6 text-sm md:text-base italic text-gray-700 bg-gray-50 rounded-r'
							{...props}
						>
							{children}
						</blockquote>
					),
					p: ({ children, ...props }) => (
						<p
							className='mb-3 md:mb-4 whitespace-pre-wrap text-sm md:text-base leading-relaxed'
							{...props}
						>
							{children}
						</p>
					),
					h1: ({ children, ...props }) => (
						<h1
							className='text-2xl md:text-3xl font-bold mb-4 md:mb-6 mt-6 md:mt-8'
							{...props}
						>
							{children}
						</h1>
					),
					h2: ({ children, ...props }) => (
						<h2
							className='text-xl md:text-2xl font-bold mb-3 md:mb-4 mt-5 md:mt-6'
							{...props}
						>
							{children}
						</h2>
					),
					h3: ({ children, ...props }) => (
						<h3
							className='text-lg md:text-xl font-bold mb-2 md:mb-3 mt-4 md:mt-5'
							{...props}
						>
							{children}
						</h3>
					),
					ul: ({ children, ...props }) => (
						<ul
							className='list-disc list-inside mb-4 md:mb-6 space-y-1 md:space-y-2'
							{...props}
						>
							{children}
						</ul>
					),
					ol: ({ children, ...props }) => (
						<ol
							className='list-decimal list-inside mb-4 md:mb-6 space-y-1 md:space-y-2'
							{...props}
						>
							{children}
						</ol>
					),
					li: ({ children, ...props }) => (
						<li className='text-sm md:text-base ml-2 md:ml-4' {...props}>
							{children}
						</li>
					),
					img: ({ src, alt, ...props }) => (
						<img
							src={src}
							alt={alt}
							className='w-full h-auto max-w-full rounded-lg my-4 md:my-6 object-cover'
							{...props}
						/>
					),
					a: ({ children, ...props }) => (
						<a className='text-[#2F94F9] hover:underline' {...props}>
							{children}
						</a>
					),
					table: ({ children, ...props }) => (
						<div className='overflow-x-auto mb-4 md:mb-6'>
							<table
								className='w-full border-collapse text-xs md:text-sm'
								{...props}
							>
								{children}
							</table>
						</div>
					),
					th: ({ children, ...props }) => (
						<th
							className='border border-gray-300 px-3 md:px-4 py-2 bg-gray-100'
							{...props}
						>
							{children}
						</th>
					),
					td: ({ children, ...props }) => (
						<td className='border border-gray-300 px-3 md:px-4 py-2' {...props}>
							{children}
						</td>
					),
				}}
			>
				{content}
			</ReactMarkdown>
		</div>
	);
};
