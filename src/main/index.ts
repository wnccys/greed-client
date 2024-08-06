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

app.whenReady().then(() => {
	ipcMain.handle("handleFileSelect", handleFileOpen);
	ipcMain.handle("sendTorrentPath", handleTorrentPath);
	ipcMain.handle("setNewTorrentSource", handleNewTorrentSource);

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

// import { app, shell, BrowserWindow, ipcMain } from 'electron'
// import { join } from 'path'
// import { electronApp, optimizer, is } from '@electron-toolkit/utils'
// import icon from '../../resources/icon.png?asset'

// function createWindow(): void {
//   // Create the browser window.
//   const mainWindow = new BrowserWindow({
//     width: 900,
//     height: 670,
//     show: false,
//     autoHideMenuBar: true,
//     ...(process.platform === 'linux' ? { icon } : {}),
//     webPreferences: {
//       preload: join(__dirname, '../preload/index.js'),
//       sandbox: false
//     }
//   })

// mainWindow.on('ready-to-show', () => {
//   mainWindow.show()
// })

// mainWindow.webContents.setWindowOpenHandler((details) => {
//   shell.openExternal(details.url)
//   return { action: 'deny' }
// })

//   // HMR for renderer base on electron-vite cli.
//   // Load the remote URL for development or the local html file for production.
//   if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
//     mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
//   } else {
//     mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
//   }
// }

// // This method will be called when Electron has finished
// // initialization and is ready to create browser windows.
// // Some APIs can only be used after this event occurs.
// app.whenReady().then(() => {
//   // Set app user model id for windows
//   electronApp.setAppUserModelId('com.electron')

//   // Default open or close DevTools by F12 in development
//   // and ignore CommandOrControl + R in production.
//   // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
//   app.on('browser-window-created', (_, window) => {
//     optimizer.watchWindowShortcuts(window)
//   })

//   // IPC test
//   ipcMain.on('ping', () => console.log('pong'))

//   createWindow()

//   app.on('activate', function () {
//     // On macOS it's common to re-create a window in the app when the
//     // dock icon is clicked and there are no other windows open.
//     if (BrowserWindow.getAllWindows().length === 0) createWindow()
//   })
// })

// // Quit when all windows are closed, except on macOS. There, it's common
// // for applications and their menu bar to stay active until the user quits
// // explicitly with Cmd + Q.
// app.on('window-all-closed', () => {
//   if (process.platform !== 'darwin') {
//     app.quit()
//   }
// })

// // In this file you can include the rest of your app"s specific main process
// // code. You can also put them in separate files and require them here.
