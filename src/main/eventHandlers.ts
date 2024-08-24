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
import { addGameSource, changeDBDefaultPath, getDBCurrentPath, getSourcesList, removeSourceFromDB } from "./model";
import steamGames from "../steam-games/steam-games.json";

ipcMain.handle("startTorrentDownloadTest", handleStartTorrentDownload);
ipcMain.handle("handleFileSelect", handleFileOpen);
ipcMain.handle("sendTorrentPath", handleTorrentPath);
ipcMain.handle("addSourceToDB", handleNewTorrentSource);
ipcMain.handle("getSourcesList", handleGetSourcesList);
ipcMain.handle("changeDefaultPath", handleChangeDefaultPath);
ipcMain.handle("removeSourceFromDB", handleRemoveSourceFromDB);
ipcMain.handle("getCurrentDownloadPath", handleGetCurrentDownloadPath);
ipcMain.on("updateDownloadPath", handleUpdateDownloadPath);
ipcMain.on("updateTorrentProgress", handleUpdateTorrentProgress);
ipcMain.on("torrentDownloadComplete", handleTorrentDownloadComplete);
ipcMain.on("updateTorrentPauseStatus" , handleUpdateTorrentPausedStatus);

// ---- Sources ----
async function handleGetSourcesList() {
	const sourcesList = await getSourcesList();

	return sourcesList;
}

async function handleRemoveSourceFromDB(
	_event: IpcMainInvokeEvent,
	sourceName: string,
) {
	const result = removeSourceFromDB(sourceName);

	return result;
}

// ----Torrent----
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

function handleUpdateTorrentPausedStatus(status: IpcMainEvent) {
	for (const win of BrowserWindow.getAllWindows()) {
		win.webContents.send("updateTorrentPauseStatus",  status);
	}
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
): Promise<string[]> {
	console.log(`sourceLink: ${sourceLink}`);

	try {
		new URL(sourceLink);
	} catch (error) {
		console.error("Invalid URL:", error);
		return Promise.resolve(["Error", "Provide a valid URL."]);
	}

	const result = await fetch(sourceLink);
	const stringifiedBody = JSON.stringify(await result.json());
	handleMerge(stringifiedBody);
	const response = addGameSource(stringifiedBody);

	return response;
}

function handleTorrentDownloadComplete() {
	for (const win of BrowserWindow.getAllWindows()) {
		win.webContents.send("torrentDownloadComplete");
	}
}

// ----Torrent Select File Handling----
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

// ----Path Select Handling----
async function handleChangeDefaultPath(): Promise<string[]> {
	const { canceled, filePaths } = await dialog.showOpenDialog({
		title: "Select Folder",
		properties: ["openDirectory"],
	});

	if (!canceled) {
		return await changeDBDefaultPath(filePaths);
	}

	return Promise.resolve(["Error", "Path can't be empty."]);
}

async function handleUpdateDownloadPath(newPath: IpcMainEvent) {
	for (const win of BrowserWindow.getAllWindows()) {
		win.webContents.send("updateDownloadPath", newPath);
	}
}

async function handleGetCurrentDownloadPath() {
	return await getDBCurrentPath();
}

interface steamGame {
	id: number;
	name: string;
	clientIcon: string;
}

async function handleMerge(sourceData: string) {
	const jsonifiedSource = JSON.parse(sourceData).downloads;
	const gameData = (steamGames as steamGame[]);

	let count = 0;
	gameData.map((steamGame) => {
		for (const jsonGame of jsonifiedSource) {
			if (normalizeTitle(jsonGame.title) === normalizeTitle(steamGame.name)) {
				console.log(`match!!! ${steamGame.name}, ${jsonGame.title}`);
				count++
				console.log("count: ", count);
			} 
		}
	});
}

function normalizeTitle(title: string) {
    // Convert to lowercase
    let normalized = title.toLowerCase();

    // Remove content within parentheses and brackets
    normalized = normalized.replace(/\(.*?\)/g, '').replace(/\[.*?\]/g, '');

    // Replace dots and hyphens with spaces
    normalized = normalized.replace(/[.\-]/g, ' ');

    // Remove '+' signs and other special characters
    normalized = normalized.replace(/[+]/g, ' ');

    // Remove any remaining special characters
    normalized = normalized.replace(/[^a-z0-9\s]/g, '');

    // Replace multiple spaces with a single space and trim
    normalized = normalized.replace(/\s+/g, ' ').trim();

    return normalized;
}