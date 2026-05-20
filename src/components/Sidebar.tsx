import React from 'react'
import './Sidebar.css'

interface FileEntry {
  name: string;
  path: string;
}

interface SidebarProps {
  files: FileEntry[];
  onFileSelect: (file: FileEntry) => void;
  onSelectFolder: () => void;
  selectedFilePath?: string;
  folderPath: string | null;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  files, 
  onFileSelect, 
  onSelectFolder, 
  selectedFilePath,
  folderPath
}) => {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <button className="btn-open" onClick={onSelectFolder}>
          {folderPath ? 'Change Folder' : 'Open Folder'}
        </button>
      </div>
      <div className="sidebar-content">
        <div className="section-title">Files</div>
        <ul className="file-list">
          {files.length === 0 && (
            <li className="no-files">No .md files found</li>
          )}
          {files.map((file) => (
            <li 
              key={file.path} 
              className={`file-item ${selectedFilePath === file.path ? 'active' : ''}`}
              onClick={() => onFileSelect(file)}
            >
              <span className="file-icon">📄</span>
              <span className="file-name">{file.name}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="sidebar-footer">
        v{(import.meta as any).env.VITE_APP_VERSION || window.electronAPI?.getAppVersion()}
      </div>
    </aside>
  )
}

export default Sidebar
