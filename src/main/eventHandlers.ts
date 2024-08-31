import {
	type IpcMainEvent,
	type IpcMainInvokeEvent,
	dialog,
	BrowserWindow,
	ipcMain,
	shell,
} from "electron";
import path from "node:path";
import { initTorrentDownload } from "./torrentClient";
import { handleStartTorrentDownload } from "./tests";
import {
	addGameSource,
	addNewGameRegisteredPath,
	changeDBDefaultPath,
	getDBCurrentPath,
	getDBGameInfos,
	getDBGamesByName,
	getGameRegisteredPath,
	getSourcesList,
	removeSourceFromDB,
} from "./model";
import type { Worker } from "node:worker_threads";
import { execFile } from "node:child_process";

ipcMain.handle("startTorrentDownloadTest", handleStartTorrentDownload);
ipcMain.handle("handleFileSelect", handleFileOpen);
ipcMain.handle("sendTorrentPath", handleTorrentPath);
ipcMain.handle("addSourceToDB", handleNewTorrentSource);
ipcMain.handle("getSourcesList", handleGetSourcesList);
ipcMain.handle("changeDefaultPath", handleChangeDefaultPath);
ipcMain.handle("startGameDownload", handleStartGameDownload);
ipcMain.handle("getGamesByName", handleGetGamesByName);
ipcMain.handle("openHydraLinks", handleOpenHydraLinks);
ipcMain.handle("removeSourceFromDB", handleRemoveSourceFromDB);
ipcMain.handle("getSelectedGameInfo", handleGetCurrentGameInfo);
ipcMain.handle("getCurrentDownloadPath", handleGetCurrentDownloadPath);
ipcMain.handle("verifyGameRegisteredPath", handleVerifyGameRegisteredPath);
ipcMain.on("updateDownloadPath", handleUpdateDownloadPath);
ipcMain.on("updateTorrentProgress", handleUpdateTorrentProgress);
ipcMain.on("torrentDownloadComplete", handleTorrentDownloadComplete);
ipcMain.on("updateTorrentPauseStatus", handleUpdateTorrentPausedStatus);

async function handleOpenHydraLinks() {
	shell.openExternal("https://hydralinks.cloud/sources/");
}

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
async function handleStartGameDownload(
	_event: IpcMainInvokeEvent,
	uris: string[],
) {
	const downloadFolder = await handleGetCurrentDownloadPath();
	initTorrentDownload(uris[0], downloadFolder);
}

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
		win.webContents.send("updateTorrentPauseStatus", status);
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
) {
	try {
		new URL(sourceLink);
	} catch (error) {
		console.error("Invalid URL:", error);
	}

	const result = await fetch(sourceLink);
	handleMerge(await result.json());
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

import createWorker from "./worker?nodeWorker";
import type { JSONGame } from "./worker";
import type { Downloads } from "./entity/Downloads";

interface Source {
	name: string;
	downloads: JSONGame[];
}

function handleMerge(Source: Source) {
	const jsonifiedLinks = Source.downloads;
	const linksLength = jsonifiedLinks.length;
	const workers: Worker[] = [];
	let newDownloads: JSONGame[] = [];
	let alreadyDone = 0;

	const workerLimit = 12;
	for (let i = 0; i < workerLimit; i++) {
		const worker = createWorker({});

		worker.on("message", async (result: JSONGame[]) => {
			console.log(`Performance on Worker-${i}: `, performance.now());
			newDownloads = newDownloads.concat(result);
			alreadyDone++;

			if (alreadyDone === workerLimit) {
				Source.downloads = newDownloads;
				console.log("Total: ", newDownloads.length);
				const result = await addGameSource(JSON.stringify(Source));
				for (const win of BrowserWindow.getAllWindows()) {
					win.webContents.send("mergeResult", result);
				}
			}
		});

		worker.on("error", (err) => {
			console.error(`Worker-${i} Error: `, err);

			for (const win of BrowserWindow.getAllWindows()) {
				win.webContents.send("mergeResult", ["Error", `Merge failed: ${err}`]);
			}
		});

		worker.on("exit", (code) => {
			console.log(`Worker-${i} exited with code: `, code);
		});

		const initialSlice = Math.round((i / workerLimit) * linksLength);
		const finalSlice = Math.round(((i + 1) / workerLimit) * linksLength) - 1;

		console.log(`from: ${initialSlice}, to: ${finalSlice}`);
		worker.postMessage(jsonifiedLinks.slice(initialSlice, finalSlice));
		workers.push(worker);
	}
}

async function handleGetCurrentGameInfo(
	_event: IpcMainInvokeEvent,
	gameId: number,
): Promise<Downloads[]> {
	return await getDBGameInfos(gameId);
}

async function handleGetGamesByName(_event: IpcMainInvokeEvent, name: string) {
	return await getDBGamesByName(name);
}

async function handleVerifyGameRegisteredPath(
	_event: IpcMainInvokeEvent,
	gameName: string,
	gameSteamId: number,
	gameIcon: string,
	gameURIS: string[],
): Promise<string[]> {
	const gamePathObj = await getGameRegisteredPath(gameSteamId);
	if (gamePathObj) {
		shell.openPath(gamePathObj.execPath).then((result) => {
			if (result) {
				console.error("Error executing as admin: ", result);
			}

			console.log("Success running file.");
		});

		return ["Success", "App Initiated"];
	}

	const { canceled, filePaths } = await dialog.showOpenDialog({
		title: "Select Game Executable",
		properties: ["openFile"],
		filters: [{ name: "Executables", extensions: ["exe"] }],
	});

	const fileExtension = path.extname(filePaths[0]).toLowerCase();

	if (fileExtension !== ".exe") {
		return ["Error", "Only executables are allowed."];
	}

	if (canceled) {
		return ["Warning", "No Path Selected."];
	}

	await addNewGameRegisteredPath(
		gameName,
		gameSteamId,
		gameIcon,
		gameURIS,
		filePaths[0],
	);
	return ["Success", "Path added."];
}
