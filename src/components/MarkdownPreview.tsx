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
  const resolveImagePath = (src: string) => {
    if (!filePath || src.startsWith('http') || src.startsWith('data:')) {
      return src
    }
    
    // Decodificar el src para evitar problemas de doble codificación
    const decodedSrc = decodeURIComponent(src)
    
    // Detectar el separador de directorios en base al archivo markdown
    const isWindows = filePath.includes('\\')
    
    // Comprobar si la ruta de la imagen ya es absoluta local
    const isAbsolute = decodedSrc.startsWith('/') || decodedSrc.startsWith('\\') || /^[a-zA-Z]:/.test(decodedSrc)
    
    let absolutePath = ''
    if (isAbsolute) {
      // Normalizar slashes a barras inclinadas (seguro para URLs)
      absolutePath = decodedSrc.replace(/\\/g, '/')
    } else {
      // Obtener el directorio del archivo markdown actual
      const lastSeparatorIndex = Math.max(filePath.lastIndexOf('\\'), filePath.lastIndexOf('/'))
      const dir = filePath.substring(0, lastSeparatorIndex + 1)
      
      // Normalizar los separadores de la ruta relativa y concatenar (siempre a forward slashes para la URL)
      const normalizedSrc = decodedSrc.replace(/\\/g, '/')
      absolutePath = (dir + normalizedSrc).replace(/\\/g, '/')
    }
    
    // Garantizar que la ruta absoluta no empiece con un slash adicional si ya lo tiene,
    // y estructurarla con exactamente 3 slashes y URL-encoding para espacios y caracteres especiales
    const cleanPath = absolutePath.startsWith('/') ? absolutePath.substring(1) : absolutePath
    return `app-file:///${encodeURI(cleanPath)}`
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
