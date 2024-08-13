import {
	type IpcMainEvent,
	type IpcMainInvokeEvent,
	dialog,
	BrowserWindow,
	ipcMain,
} from "electron";
import path from "node:path";
import { initTorrentDownload } from "./torrentClient";
import { handleStartTorrentDownload } from "./tests";

ipcMain.handle("startTorrentDownloadTest", handleStartTorrentDownload);
ipcMain.handle("handleFileSelect", handleFileOpen);
ipcMain.handle("sendTorrentPath", handleTorrentPath);
ipcMain.handle("setNewTorrentSource", handleNewTorrentSource);

ipcMain.on("updateTorrentProgress", handleUpdateTorrentProgress);
export function handleUpdateTorrentProgress(
	torrentProgress: IpcMainEvent,
	game: string,
	timeRemaining: number,
	downloadSpeed: number,
	downloaded: number,
	size: number,
) {
	for (const win of BrowserWindow.getAllWindows()) {
		// Send data to all listeners registered in selected Window.
		win.webContents.send("updateTorrentProgress", {
			game,
			timeRemaining,
			currentProgress: (Number(torrentProgress) * 100).toFixed(2),
			downloadSpeed: (downloadSpeed / 100000).toFixed(0),
			downloaded: (downloaded / 1000000).toFixed(0),
			totalSize: (size / 1000000).toFixed(0),
		});
	}
}

export async function handleFileOpen(): Promise<Array<string>> {
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

export async function handleTorrentPath(
	_event: IpcMainInvokeEvent,
	path: string,
) {
	console.log("Path to torrent is: ", path);
	const { canceled, filePaths } = await dialog.showOpenDialog({
		title: "Select Folder",
		properties: ["openDirectory", "createDirectory"],
	});

	if (!canceled) {
		initTorrentDownload(path, filePaths[0]);
	}
}

export async function handleNewTorrentSource(
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
			.catch((e) =>
				console.error(
					`Could not fetch from given link: ${sourceLink}.\n Error: ${e}.`,
				),
			);
	} catch (e) {
		console.error(e);
	}
}

export function registerWindowEvents(windowId: number) {
	const mainWindow = BrowserWindow.fromId(windowId);
	if (mainWindow) {
		ipcMain.handle("minimizeWindow", () => mainWindow.minimize());
		ipcMain.handle("maximizeWindow", () => mainWindow.maximize());
		ipcMain.handle("unmaximizeWindow", () => mainWindow.unmaximize());
		ipcMain.handle("closeWindow", () => mainWindow.close());
		ipcMain.handle("checkWindowIsMaximized", () => mainWindow.isMaximized());
	} else {
		throw Error("Could Not Get Window from Id.");
	}
}
