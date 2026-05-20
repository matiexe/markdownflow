import { app, BrowserWindow, ipcMain, dialog, protocol } from 'electron'
import path from 'node:path'
import fs from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { net } from 'electron'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// The built directory structure
process.env.DIST = path.join(__dirname, '../dist')
process.env.VITE_PUBLIC = app.isPackaged ? process.env.DIST : path.join(process.env.DIST, '../public')


let win: BrowserWindow | null

// Register custom protocol for local files
function registerLocalFileProtocol() {
  protocol.handle('app-file', (request) => {
    const filePath = decodeURIComponent(request.url.replace('app-file://', ''))
    return net.fetch('file://' + filePath)
  })
}

function createWindow() {
  const preloadPath = path.join(__dirname, 'preload.js')
  console.log('Preload path:', preloadPath) // For debugging

  win = new BrowserWindow({
    icon: path.join(process.env.VITE_PUBLIC!, 'logo.png'),
    webPreferences: {
      preload: preloadPath,
      contextIsolation: true,
      nodeIntegration: false,
    },
    title: 'MarkdownFlow',
    width: 1200,
    height: 800,
    titleBarStyle: 'hiddenInset',
    autoHideMenuBar: true // This hides the menu bar on Windows/Linux
  })

  // Also remove the menu completely
  win.setMenuBarVisibility(false)

  // Register protocol before loading
  registerLocalFileProtocol()

  if (process.env.VITE_DEV_SERVER_URL) {
    win.loadURL(process.env.VITE_DEV_SERVER_URL)
    // win.webContents.openDevTools() // Useful for debugging if needed
  } else {
    win.loadFile(path.join(process.env.DIST!, 'index.html'))
  }
}

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
    win = null
  }
})

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

app.whenReady().then(createWindow)

// IPC Handlers
ipcMain.handle('select-folder', async () => {
  const result = await dialog.showOpenDialog(win!, {
    properties: ['openDirectory']
  })
  if (result.canceled) return null
  return result.filePaths[0]
})

ipcMain.handle('get-files', async (event, folderPath: string) => {
  try {
    const files = await fs.readdir(folderPath)
    return files
      .filter(file => file.endsWith('.md'))
      .map(file => ({
        name: file,
        path: path.join(folderPath, file)
      }))
  } catch (error) {
    console.error('Error reading directory:', error)
    return []
  }
})

ipcMain.handle('read-file', async (event, filePath: string) => {
  try {
    const content = await fs.readFile(filePath, 'utf-8')
    return content
  } catch (error) {
    console.error('Error reading file:', error)
    return null
  }
})

ipcMain.handle('export-to-pdf', async (event, fileName: string) => {
  if (!win) return { success: false }

  const result = await dialog.showSaveDialog(win, {
    title: 'Export to PDF',
    defaultPath: fileName.replace('.md', '.pdf'),
    filters: [{ name: 'PDF Files', extensions: ['pdf'] }]
  })

  if (result.canceled || !result.filePath) return { success: false }

  try {
    const data = await win.webContents.printToPDF({
      printBackground: true,
      margins: { top: 1, bottom: 1, left: 1, right: 1 }, // Standard margins in inches (approx)
      displayHeaderFooter: false,
      pageSize: 'A4'
    })
    await fs.writeFile(result.filePath, data)
    return { success: true, filePath: result.filePath }
  } catch (error) {
    console.error('Failed to export PDF:', error)
    return { success: false, error: (error as Error).message }
  }
})
