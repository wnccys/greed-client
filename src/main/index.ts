import { app, BrowserWindow } from "electron";
import { optimizer } from "@electron-toolkit/utils";
import path from "node:path";
import "reflect-metadata";
import * as mainEventHandler from "./eventHandlers";

const createWindow = () => {
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
	createWindow();
});

app.on("window-all-closed", () => {
	if (process.platform !== "darwin") app.quit();
});

app.on("browser-window-created", (_, window) => {
	optimizer.watchWindowShortcuts(window);
});