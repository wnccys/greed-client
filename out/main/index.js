import { app, ipcMain, BrowserWindow, dialog, Menu } from "electron";
import { optimizer } from "@electron-toolkit/utils";
import path from "node:path";
import WebTorrent from "webtorrent";
import fs from "node:fs";
import __cjs_mod__ from "node:module";
const __filename = import.meta.filename;
const __dirname = import.meta.dirname;
const require2 = __cjs_mod__.createRequire(import.meta.url);
const client = new WebTorrent();
async function initTorrentDownload(filePath, downloadFolder) {
  client.add(
    filePath,
    { path: downloadFolder },
    (torrent) => {
      console.log("Download path is: ", downloadFolder);
      console.log("\n torrent info hash: ", torrent.infoHash);
      console.log("magnet URI: ", torrent.magnetURI, "\n");
      console.log(
        "Checked if file exists: ",
        path.join(downloadFolder, torrent.name)
      );
      if (fs.existsSync(path.join(downloadFolder, torrent.name))) {
        console.log("File already exists at: ", downloadFolder);
        return;
      }
      torrent.on("download", (bytes) => {
        console.log(`downloaded: ${(bytes / 1e3).toFixed(1)} megabytes.`);
        console.log(`progress: ${(torrent.progress * 100).toFixed(2)}%`);
        console.log(
          `Time remaining: ${(torrent.timeRemaining / 1e3 / 60).toFixed(0)} minutes.`
        );
      });
      torrent.on("done", () => {
        console.log("Torrent Download Complete.");
        torrent.destroy();
      });
    }
  );
  client.on("error", (err) => {
    console.error("WebTorrent Error: ", err);
  });
}
async function handleFileOpen() {
  const { canceled, filePaths } = await dialog.showOpenDialog({
    title: "Select File",
    properties: ["openFile"]
  });
  if (!canceled) {
    console.log(filePaths);
    return [`Selected File: ${path.basename(filePaths[0])}`, filePaths[0]];
  }
  return ["", "Please, Select a Valid Torrent File"];
}
async function handleTorrentPath(_event, path2) {
  console.log("path to torrent is: ", path2);
  const { canceled, filePaths } = await dialog.showOpenDialog({
    title: "Select Folder",
    properties: ["openDirectory", "createDirectory"]
  });
  if (!canceled) {
    initTorrentDownload(path2, filePaths[0]);
  }
}
const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    autoHideMenuBar: true,
    webPreferences: {
      preload: path.join(__dirname, "../preload/index.mjs"),
      sandbox: false,
      webSecurity: false
    },
    titleBarStyle: "hidden",
    titleBarOverlay: {
      color: "#171717",
      symbolColor: "#F5F5F5",
      height: 25
    }
  });
  Menu.setApplicationMenu(null);
  mainWindow.loadURL("http://localhost:5173");
  mainWindow.on("ready-to-show", () => {
    mainWindow.show();
  });
};
app.whenReady().then(() => {
  ipcMain.handle("handleFileSelect", handleFileOpen);
  ipcMain.handle("sendTorrentPath", handleTorrentPath);
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
  createWindow();
});
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
app.on("browser-window-created", (_, window) => {
  optimizer.watchWindowShortcuts(window);
});
