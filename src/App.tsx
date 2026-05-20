import { useState, useEffect } from 'react'
import Sidebar from './components/Sidebar'
import MarkdownPreview from './components/MarkdownPreview'
import './App.css'

interface FileEntry {
  name: string;
  path: string;
}

function App() {
  const [folderPath, setFolderPath] = useState<string | null>(null)
  const [files, setFiles] = useState<FileEntry[]>([])
  const [selectedFile, setSelectedFile] = useState<FileEntry | null>(null)
  const [markdown, setMarkdown] = useState<string>('')
  const [isElectron, setIsElectron] = useState<boolean>(true)
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null)

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(null), 4000)
      return () => clearTimeout(timer)
    }
  }, [notification])

  const showNotification = (message: string, type: 'success' | 'error') => {
    setNotification({ message, type })
  }

  useEffect(() => {
    // Check if electronAPI is available after a small delay
    const checkElectron = () => {
      if (!window.electronAPI) {
        setIsElectron(false)
        console.warn('electronAPI not found. If you are in a browser, this is expected.')
      }
    }
    const timer = setTimeout(checkElectron, 1000)
    return () => clearTimeout(timer)
  }, [])

  // Handle Drag and Drop
  useEffect(() => {
    const handleDragOver = (e: DragEvent) => {
      e.preventDefault()
      e.stopPropagation()
    }

    const handleDrop = async (e: DragEvent) => {
      e.preventDefault()
      e.stopPropagation()
      
      const droppedFiles = e.dataTransfer?.files
      if (droppedFiles && droppedFiles.length > 0) {
        const file = droppedFiles[0]
        const filePath = (file as any).path
        if (filePath && filePath.endsWith('.md')) {
          const name = file.name
          handleFileSelect({ name, path: filePath })
        }
      }
    }

    document.addEventListener('dragover', handleDragOver)
    document.addEventListener('drop', handleDrop)

    return () => {
      document.removeEventListener('dragover', handleDragOver)
      document.removeEventListener('drop', handleDrop)
    }
  }, [])

  if (!isElectron && !window.electronAPI) {
    return (
      <div className="error-screen">
        <h1>MarkdownFlow</h1>
        <div className="error-box">
          <p><strong>Error: API de Electron no detectada.</strong></p>
          <p>Esta aplicación requiere ejecutarse dentro de Electron.</p>
          <p>Asegúrate de haber iniciado con <code>npm run dev</code> y estar usando la ventana de la aplicación.</p>
        </div>
      </div>
    )
  }

  const handleSelectFolder = async () => {
    const path = await window.electronAPI.selectFolder()
    if (path) {
      loadFolder(path)
    }
  }

  const loadFolder = async (path: string) => {
    setFolderPath(path)
    const folderFiles = await window.electronAPI.getFiles(path)
    setFiles(folderFiles)
  }

  const handleFileSelect = async (file: FileEntry) => {
    setSelectedFile(file)
    const content = await window.electronAPI.readFile(file.path)
    setMarkdown(content || '')
  }

  const handleExportPdf = async () => {
    if (!selectedFile) return
    const result = await window.electronAPI.exportToPdf(selectedFile.name)
    if (result.success) {
      showNotification(`PDF exportado correctamente a ${result.filePath?.split('\\').pop()}`, 'success')
    } else if (result.error) {
      showNotification(`Error al exportar: ${result.error}`, 'error')
    }
  }

  return (
    <div className="app-container">
      {notification && (
        <div className={`notification ${notification.type}`}>
          {notification.message}
        </div>
      )}
      <Sidebar 
        files={files} 
        onFileSelect={handleFileSelect} 
        onSelectFolder={handleSelectFolder}
        selectedFilePath={selectedFile?.path}
        folderPath={folderPath}
      />
      <main className="main-content">
        <header className="top-bar">
          <div className="file-info">
            {selectedFile ? selectedFile.name : 'No file selected'}
          </div>
          <div className="actions">
            <button 
              className="btn-export" 
              onClick={handleExportPdf}
              disabled={!selectedFile}
            >
              Export to PDF
            </button>
          </div>
        </header>
        <div className="preview-area">
          {selectedFile ? (
            <MarkdownPreview content={markdown} filePath={selectedFile.path} />
          ) : (
            <div className="empty-state">
              <div className="empty-content">
                <p>Select a markdown file or drag one here</p>
                <button className="btn-open-large" onClick={handleSelectFolder}>
                  Open Folder
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

export default App
