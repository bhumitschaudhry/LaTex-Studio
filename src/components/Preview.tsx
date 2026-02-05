import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

interface PreviewProps {
  content: string;
}

export const Preview: React.FC<PreviewProps> = ({ content }) => {
  return (
    <div className="h-full w-full overflow-auto bg-white p-8 prose prose-slate max-w-none prose-headings:font-semibold prose-a:text-blue-600">
      <ReactMarkdown
        children={content}
        remarkPlugins={[remarkMath]}
        rehypePlugins={[rehypeKatex]}
        components={{
          code({ node, inline, className, children, ...props }: any) {
            return (
              <code className={`${className} bg-gray-100 rounded px-1 py-0.5 text-sm font-mono text-gray-800`} {...props}>
                {children}
              </code>
            );
          },
          pre({ node, children, ...props }: any) {
             return (
               <pre className="bg-gray-50 rounded-lg p-4 overflow-x-auto border border-gray-100" {...props}>
                 {children}
               </pre>
             );
          }
        }}
      />
    </div>
  );
};
