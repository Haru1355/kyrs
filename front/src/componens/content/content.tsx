import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkBreaks from 'remark-breaks';
import remarkGfm from 'remark-gfm';
export const Content = ({ content }: { content: string }) => {
	return (
		<div className=''>
			<ReactMarkdown
				remarkPlugins={[remarkGfm, remarkBreaks]}
				rehypePlugins={[rehypeRaw]}
				components={{
					del: ({ children, ...props }) => (
						<s style={{ textDecoration: 'line-through' }} {...props}>
							{' '}
							{children}{' '}
						</s>
					),
					em: ({ children, ...props }) => (
						<i style={{ fontStyle: 'italic' }} {...props}>
							{' '}
							{children}{' '}
						</i>
					),
					strong: ({ children, ...props }) => (
						<b style={{ fontWeight: 'bold' }} {...props}>
							{' '}
							{children}{' '}
						</b>
					),
					u: ({ children, ...props }) => (
						<u style={{ textDecoration: 'underline' }} {...props}>
							{' '}
							{children}{' '}
						</u>
					),
					blockquote: ({ children, ...props }) => (
						<blockquote
							className='!border-l-[3px] !border-black !pl-5 !text-[16px] !leading-relaxed italic'
							{...props}
						>
							{' '}
							{children}{' '}
						</blockquote>
					),
					p: ({ children, ...props }) => (
						<p className='!mb-2 !whitespace-pre-wrap' {...props}>
							{' '}
							{children}{' '}
						</p>
					),
					a: ({ children, ...props }) => (
						<a className='text-[#2F94F9]' {...props}>
							{children}
						</a>
					),
				}}
			>
				{content}
			</ReactMarkdown>
		</div>
	);
};
