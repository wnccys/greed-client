import { app, BrowserWindow } from "electron";
import { optimizer } from "@electron-toolkit/utils";
import path from "node:path";
import "reflect-metadata";
import { initDatabase } from "@main/model/model";
import { format } from "node:url";
import * as MainEventHandle from "@main/events/eventHandlers";

// Load and register events
MainEventHandle;

const createWindow = async () => {
	const mainWindow = new BrowserWindow({
		roundedCorners: true,
		icon: "./build/icon.png",
		backgroundColor: "#171717",
		minWidth: 750,
		minHeight: 625,
		autoHideMenuBar: true,
		webPreferences: {
			preload: path.join(__dirname, "../preload/index.mjs"),
			sandbox: false,
			webSecurity: false,
		},
		titleBarOverlay: {
			color: "#171717",
			symbolColor: "#F5F5F5",
			height: 30,
		},
		titleBarStyle: "hidden",
		show: false,
	});
	mainWindow.maximize();

	/*
		If on production mode, use # path system file specifier
		(required as electron works in a file-based manner on build)
	*/
	const urlToLoad = app.isPackaged
		? `${format({
				pathname: path.join(__dirname, "../renderer/index.html"),
				protocol: "file:",
				slashes: true,
			})}#/catalog`
		: "http://localhost:5173/#/catalog";

	mainWindow.loadURL(urlToLoad).then(() => mainWindow.show());
};

app.whenReady().then(async () => {
	await initDatabase();
	createWindow();
});

app.on("window-all-closed", async () => {
	if (process.platform !== "darwin") app.quit();
});

app.on("browser-window-created", (_, window) => {
	optimizer.watchWindowShortcuts(window);
});
