import { app, BrowserWindow } from "electron";
import { optimizer } from "@electron-toolkit/utils";
import path from "node:path";
import "reflect-metadata";
import { testDBConn } from "./model";
import * as MainEventHandle from "./eventHandlers";

MainEventHandle;

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
		  titleBarOverlay: {
			color: '#171717',
			symbolColor: '#F5F5F5',
			height: 30
		},
		titleBarStyle: "hidden",
		show: false,
	});
	mainWindow.maximize();
	mainWindow.loadURL("http://localhost:5173/catalog").then(() => mainWindow.show());
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

testDBConn();