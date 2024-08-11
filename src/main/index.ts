<<<<<<< HEAD
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
=======
import { app, BrowserWindow } from "electron";
import { optimizer } from "@electron-toolkit/utils";
import path from "node:path";
import "reflect-metadata";
import * as mainEventHandler from "./eventHandlers";

const createWindow = () => {
>>>>>>> 5095f491525e76447a40d89d34828e9d282c5da2
	const mainWindow = new BrowserWindow({
		roundedCorners: true,
		backgroundColor: "#171717",
		minWidth: 750,
		minHeight: 625,
		autoHideMenuBar: true,
		webPreferences: {
			preload: path.join(__dirname, "../preload/index.mjs"),
			sandbox: false,
			webSecurity: false,
		},
		titleBarStyle: "hidden",
		show: false,
	});
<<<<<<< HEAD
  
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
  
=======
	mainWindow.loadURL("http://localhost:5173").then(() => mainWindow.show());

	mainEventHandler.registerWindowEvents(mainWindow.id);

	mainWindow.on("enter-full-screen", () =>
		mainWindow.webContents.send(
			"updateMaximizedState",
			mainWindow.isMaximized(),
		),
	);
	mainWindow.on("leave-full-screen", () =>
		mainWindow.webContents.send(
			"updateMaximizedState",
			mainWindow.isMaximized(),
		),
	);
	mainWindow.on("maximize", () =>
		mainWindow.webContents.send(
			"updateMaximizedState",
			mainWindow.isMaximized(),
		),
	);
	mainWindow.on("unmaximize", () =>
		mainWindow.webContents.send(
			"updateMaximizedState",
			mainWindow.isMaximized(),
		),
	);
};

app.whenReady().then(() => {
>>>>>>> 5095f491525e76447a40d89d34828e9d282c5da2
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
<<<<<<< HEAD
  });
  
=======
});
>>>>>>> 5095f491525e76447a40d89d34828e9d282c5da2
