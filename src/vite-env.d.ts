/// <reference types="vite/client" />

interface ElectronAPI {
  selectFolder: () => Promise<string | null>;
  getFiles: (folderPath: string) => Promise<{ name: string; path: string }[]>;
  readFile: (filePath: string) => Promise<string | null>;
  exportToPdf: (fileName: string) => Promise<{ success: boolean; filePath?: string; error?: string }>;
  onMainProcessMessage: (callback: (message: string) => void) => void;
}

interface Window {
  electronAPI: ElectronAPI;
}
