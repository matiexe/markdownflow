const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
  selectFolder: () => ipcRenderer.invoke('select-folder'),
  getFiles: (folderPath: string) => ipcRenderer.invoke('get-files', folderPath),
  readFile: (filePath: string) => ipcRenderer.invoke('read-file', filePath),
  exportToPdf: (fileName: string) => ipcRenderer.invoke('export-to-pdf', fileName),
  getAppVersion: () => '1.1.6', // Updated manually to avoid production file system issues
  onMainProcessMessage: (callback: (message: string) => void) => {
    ipcRenderer.on('main-process-message', (_event: any, value: string) => callback(value))
  }
})
