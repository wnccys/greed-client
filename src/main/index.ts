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
import "reflect-metadata";

function handleUpdateTorrentProgress(_event: IpcMainInvokeEvent, torrentProgress: string) {
	console.log(`Updated torrent progress: ${torrentProgress}`);
}

async function handleFileOpen(): Promise<Array<string>> {
	const { canceled, filePaths } = await dialog.showOpenDialog({
		title: "Select File",
		properties: ["openFile"],
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

async function handleNewTorrentSource(
	_event: IpcMainInvokeEvent,
	sourceLink: string,
) {
	console.log(`sourceLink: ${sourceLink}`);

	try {
		fetch(sourceLink)
		.then((response: Response) => response.json())
		.then((body: ReadableStream<Uint8Array> | null) => {
			const stringifiedBody = JSON.parse(JSON.stringify(body));
			console.log(stringifiedBody.name);
			console.log(stringifiedBody.downloads[0]);
		})
		.catch( (e) => console.error(`Could not fetch from given link: ${sourceLink}.\n Error: ${e}.`) );
	} catch (e) {
		console.error(e);
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
		titleBarStyle: "hidden",
		titleBarOverlay: {
			color: "#171717",
			symbolColor: "#F5F5F5",
			height: 25,
		},
	});
  
	Menu.setApplicationMenu(null);
  
	mainWindow.loadURL("http://localhost:5173");
  
	mainWindow.on("ready-to-show", () => {
	  mainWindow.show();
	});
  };
  
  const createSecond = () => {
	const secondaryWindow = new BrowserWindow({
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
	  }
	});
  
	Menu.setApplicationMenu(null);
  
	secondaryWindow.loadURL("http://localhost:5173/download");
  
	secondaryWindow.on("ready-to-show", () => {
	  secondaryWindow.show();
	});
  };
  
  app.whenReady().then(() => {
	ipcMain.handle("handleFileSelect", handleFileOpen);
	ipcMain.handle("sendTorrentPath", handleTorrentPath);
	ipcMain.handle("setNewTorrentSource", handleNewTorrentSource);
	ipcMain.handle("updateTorrentProgress", handleUpdateTorrentProgress);

	app.on("activate", () => {
		if (BrowserWindow.getAllWindows().length === 0) createWindow();
	});

	createWindow();
	createSecond();
  
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
  