import {
	app,
	BrowserWindow,
	ipcMain,
	dialog,
	Menu,
	type IpcMainInvokeEvent,
  } from "electron";
  import { optimizer } from "@electron-toolkit/utils";
  import path from "node:path";
  import { initTorrentDownload } from "./torrentClient";
  
  async function handleFileOpen(): Promise<Array<string>> {
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
  
  async function handleTorrentPath(_event: IpcMainInvokeEvent, path: string) {
	console.log("path to torrent is: ", path);
	const { canceled, filePaths } = await dialog.showOpenDialog({
	  title: "Select Folder",
	  properties: ["openDirectory", "createDirectory"],
	});
  
	if (!canceled) {
	  initTorrentDownload(path, filePaths[0]);
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
			webSecurity: false,
		},
		titleBarStyle: 'hidden',
		titleBarOverlay: {
			color: '#171717',
			symbolColor: '#F5F5F5',
			height: 25,
		},
	});
  
	Menu.setApplicationMenu(null);
  
	mainWindow.loadURL("http://localhost:5173");
  
	mainWindow.on("ready-to-show", () => {
	  mainWindow.show();
	});
  };
  
	Menu.setApplicationMenu(null);
  
  
  app.whenReady().then(() => {
	ipcMain.handle("handleFileSelect", handleFileOpen);
	ipcMain.handle("sendTorrentPath", handleTorrentPath);
  
	createWindow();
  
	app.on("activate", () => {
	  if (BrowserWindow.getAllWindows().length === 0) createWindow();
	});
  });
  
  app.on("window-all-closed", () => {
	if (process.platform !== "darwin") app.quit();
  });
  
  app.on("browser-window-created", (_, window) => {
	optimizer.watchWindowShortcuts(window);
  });
  