import { app, BrowserWindow, ipcMain, type IpcMainEvent } from "electron";
import { optimizer } from "@electron-toolkit/utils";
import path from "node:path";
import "reflect-metadata";
import * as mainEventHandler from "./eventHandlers";

const createWindow = () => {
	const mainWindow = new BrowserWindow({
		width: 950,
		height: 670,
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
	mainWindow.loadURL("http://localhost:5173").then(() => mainWindow.show());

	ipcMain.handle("minimizeWindow", () => mainWindow.minimize());
	ipcMain.handle("maximizeWindow", () => mainWindow.maximize());
	ipcMain.handle("unmaximizeWindow", () => mainWindow.unmaximize());
	ipcMain.handle("closeWindow", () => mainWindow.close());
	ipcMain.handle("checkWindowIsMaximized", () => mainWindow.isMaximized());
	mainWindow.on("enter-html-full-screen", () =>
		mainWindow.webContents.send(
			"updateMaximizedState",
			mainWindow.isMaximized(),
		),
	);
	mainWindow.on("leave-html-full-screen", () =>
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
	ipcMain.handle("handleFileSelect", mainEventHandler.handleFileOpen);
	ipcMain.handle("sendTorrentPath", mainEventHandler.handleTorrentPath);
	ipcMain.handle(
		"setNewTorrentSource",
		mainEventHandler.handleNewTorrentSource,
	);
	ipcMain.on("updateTorrentProgress", (torrentProgress: IpcMainEvent) => {
		mainEventHandler.handleUpdateTorrentProgress(torrentProgress);
	});

	createWindow();
});

app.on("window-all-closed", () => {
	if (process.platform !== "darwin") app.quit();
});

app.on("browser-window-created", (_, window) => {
	optimizer.watchWindowShortcuts(window);
});