import React from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import rehypeRaw from 'rehype-raw'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import './MarkdownPreview.css'

interface MarkdownPreviewProps {
  content: string;
  filePath?: string;
}

const MarkdownPreview: React.FC<MarkdownPreviewProps> = ({ content, filePath }) => {
  // Function to resolve relative image paths
  const resolveImagePath = (src: string) => {
    if (!filePath || src.startsWith('http') || src.startsWith('data:')) {
      return src
    }
    
    // In Electron, we use our custom protocol app-file://
    // The path should be absolute. We get the directory of the current markdown file.
    const dir = filePath.substring(0, filePath.lastIndexOf('\\') + 1)
    const absolutePath = dir + src.replace(/\//g, '\\')
    return `app-file://${absolutePath}`
  }

  return (
    <div className="markdown-body">
      <ReactMarkdown 
        remarkPlugins={[remarkGfm, remarkMath]}
        rehypePlugins={[rehypeKatex, rehypeRaw]}
        components={{
          code({ node, inline, className, children, ...props }: any) {
            const match = /language-(\w+)/.exec(className || '')
            return !inline && match ? (
              <SyntaxHighlighter
                style={vscDarkPlus}
                language={match[1]}
                PreTag="div"
                {...props}
              >
                {String(children).replace(/\n$/, '')}
              </SyntaxHighlighter>
            ) : (
              <code className={className} {...props}>
                {children}
              </code>
            )
          },
          img({ node, src, ...props }: any) {
            return <img src={resolveImagePath(src || '')} {...props} />
          }
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}

export default MarkdownPreview
