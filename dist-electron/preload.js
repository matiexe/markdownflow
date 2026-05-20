const { contextBridge: r, ipcRenderer: o } = require("electron");
r.exposeInMainWorld("electronAPI", {
  selectFolder: () => o.invoke("select-folder"),
  getFiles: (e) => o.invoke("get-files", e),
  readFile: (e) => o.invoke("read-file", e),
  exportToPdf: (e) => o.invoke("export-to-pdf", e),
  onMainProcessMessage: (e) => {
    o.on("main-process-message", (i, n) => e(n));
  }
});
