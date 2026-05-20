import { app as a, BrowserWindow as c, ipcMain as l, dialog as d, protocol as u, net as h } from "electron";
import i from "node:path";
import s from "node:fs/promises";
import { fileURLToPath as w } from "node:url";
const p = i.dirname(w(import.meta.url));
process.env.DIST = i.join(p, "../dist");
process.env.VITE_PUBLIC = a.isPackaged ? process.env.DIST : i.join(process.env.DIST, "../public");
let o;
function m() {
  u.handle("app-file", (e) => {
    const n = decodeURIComponent(e.url.replace("app-file://", ""));
    return h.fetch("file://" + n);
  });
}
function f() {
  const e = i.join(p, "preload.js");
  console.log("Preload path:", e), o = new c({
    icon: i.join(process.env.VITE_PUBLIC, "electron-vite.svg"),
    webPreferences: {
      preload: e,
      contextIsolation: !0,
      nodeIntegration: !1
    },
    title: "MarkdownFlow",
    width: 1200,
    height: 800,
    titleBarStyle: "hiddenInset",
    autoHideMenuBar: !0
    // This hides the menu bar on Windows/Linux
  }), o.setMenuBarVisibility(!1), m(), process.env.VITE_DEV_SERVER_URL ? o.loadURL(process.env.VITE_DEV_SERVER_URL) : o.loadFile(i.join(process.env.DIST, "index.html"));
}
a.on("window-all-closed", () => {
  process.platform !== "darwin" && (a.quit(), o = null);
});
a.on("activate", () => {
  c.getAllWindows().length === 0 && f();
});
a.whenReady().then(f);
l.handle("select-folder", async () => {
  const e = await d.showOpenDialog(o, {
    properties: ["openDirectory"]
  });
  return e.canceled ? null : e.filePaths[0];
});
l.handle("get-files", async (e, n) => {
  try {
    return (await s.readdir(n)).filter((r) => r.endsWith(".md")).map((r) => ({
      name: r,
      path: i.join(n, r)
    }));
  } catch (t) {
    return console.error("Error reading directory:", t), [];
  }
});
l.handle("read-file", async (e, n) => {
  try {
    return await s.readFile(n, "utf-8");
  } catch (t) {
    return console.error("Error reading file:", t), null;
  }
});
l.handle("export-to-pdf", async (e, n) => {
  if (!o) return { success: !1 };
  const t = await d.showSaveDialog(o, {
    title: "Export to PDF",
    defaultPath: n.replace(".md", ".pdf"),
    filters: [{ name: "PDF Files", extensions: ["pdf"] }]
  });
  if (t.canceled || !t.filePath) return { success: !1 };
  try {
    const r = await o.webContents.printToPDF({
      printBackground: !0,
      margins: { top: 0, bottom: 0, left: 0, right: 0 }
    });
    return await s.writeFile(t.filePath, r), { success: !0, filePath: t.filePath };
  } catch (r) {
    return console.error("Failed to export PDF:", r), { success: !1, error: r.message };
  }
});
