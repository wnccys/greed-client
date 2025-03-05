import { addTorrentToQueue } from "@main/torrentClient";
import type { JSONGame } from "@main/worker";
import type { Source } from "@main/events/torrent/types";
import { BrowserWindow, dialog, type IpcMainEvent, type IpcMainInvokeEvent } from "electron";
import path from "node:path";

// ----Torrent----
export async function handleStartGameDownload(
	_event: IpcMainInvokeEvent,
	uris: string[],
) {
	addTorrentToQueue(uris[0]);
}

export function handleUpdateTorrentProgress(torrentProgress: IpcMainEvent) {
	for (const win of BrowserWindow.getAllWindows()) {
		win.webContents.send(
			"updateTorrentProgress",
			(Number(torrentProgress) * 100).toFixed(2),
		);
	}
}

export function handleUpdateTorrentInfos(
	torrentProgress: IpcMainEvent,
	game: string,
	uri: string,
	timeRemaining: number,
	downloadSpeed: number,
	downloaded: number,
	peers: number,
	size: number,
) {
	for (const win of BrowserWindow.getAllWindows()) {
		win.webContents.send("updateTorrentInfos", {
			game,
			uri,
			timeRemaining,
			currentProgress: (Number(torrentProgress) * 100).toFixed(2),
			downloadSpeed: (downloadSpeed / 100000).toFixed(0),
			downloaded: (downloaded / 1000000).toFixed(0),
			peers,
			totalSize: (size / 1000000).toFixed(0),
		});
	}
}

export function handleUpdateTorrentPausedStatus(status: IpcMainEvent) {
	for (const win of BrowserWindow.getAllWindows()) {
		win.webContents.send("updateTorrentPauseStatus", status);
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

export function handleTorrentDownloadComplete() {
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

// REVIEW path for worker
import createWorker from "@main/worker?nodeWorker"
import type { Worker } from "node:worker_threads";
import { addGameSource } from "@main/model/gameSource";

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