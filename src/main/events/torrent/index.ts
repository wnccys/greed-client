import { addTorrentToQueue } from "@main/torrentClient";
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

/**
 * Run mergeAlgorithm after get sources from HydraLinks.
 * @note The result of the algorithm is sent by a different listener "mergeResult" in Front-End.
 */
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
/**
 * Waits user select file then returns its path
 */
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

/** SECTION */
import createWorker from "@main/worker?nodeWorker"
import type { Worker } from "node:worker_threads";
import { addGameSource } from "@main/model/gameSource";
import type { JSONGame } from "@main/worker";

/**
 * Receive source from Hydralinks in JSON format and merges it with steam games in the DB, as it is dynamic already (get everytime user enters the app).
 * In order to do this, Vite workers are used and set in files inside @main, finally, this is a convention from Vite.
 */
async function handleMerge(Source: Source) {
	const jsonifiedLinks = Source.downloads;
	const linksLength = jsonifiedLinks.length;
	const workers: Worker[] = [];
	let newDownloads: JSONGame[] = [];
	/* Threads whose has already completed it's work */
	let alreadyDone = 0;

	// Worker limit basically represents the process threads, 12 is a convention number, a convention.
	// This can be improved by dynamically get user's available thread count.
	const workerLimit = 12;
	for (let i = 0; i < workerLimit; i++) {
		/* Init Vite worker */
		const worker = createWorker({});

		// Get worker result
		worker.on("message", async (result: JSONGame[]) => {
			console.log(`Performance on Worker-${i}: `, performance.now());
			// Add new merged results to newDownloads[] increasing the total already resolved workers
			newDownloads = newDownloads.concat(result);
			alreadyDone++;

			/**
			 * The last worker is responsible for this; when this condition is true, all work has been done,
			 * so the last worker print the total games merged (compatibility between steamGames and the external source games)
			 * sending a feedback (tuple with ["type", "message"]) to Front-End.
			 */
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

		// This generally represents an error state which wasn't caught. (Like race-conditions on Database access xd)
		worker.on("exit", (code) => {
			console.log(`Worker-${i} exited with code: `, code);
		});

		/**
		 * Slice json games into 2 parts (initial and final) getting (i / workerLimit) part of links on each loop
		 * posting it to worker, which executes the comparison algorithm itself
		 * 
		 * Algorithm first loop example visualization
		 * 								JSON games
		 * [     |      |      |      |      |      |      |      |      |      ]
		 * 
		 * The section count are our workerLimit number, where each one represents the computer threads basically,
		 * on the first loop the slices are get as follow:
		 * 
		 *  init final				JSON games
		 * 	|	 |
		 * [     |      |      |      |      |      |      |      |      |      ]
		 * 
		 * repeting it for each games section advancing the slices on each loop.
		 */
		const initialSlice = Math.round((i / workerLimit) * linksLength);
		const finalSlice = Math.round(((i + 1) / workerLimit) * linksLength) - 1;

		console.log(`from: ${initialSlice}, to: ${finalSlice}`);
		worker.postMessage(jsonifiedLinks.slice(initialSlice, finalSlice));
		workers.push(worker);
	}
}