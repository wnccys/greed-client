import WebTorrent from "webtorrent";
import path from "node:path";
import fs from "node:fs";
import { ipcMain, type IpcMainEvent } from "electron";
// import { handleUpdateTorrentProgress } from "./eventHandlers";

const client = new WebTorrent();

export async function initTorrentDownload(
	filePath: string,
	downloadFolder: string,
) {
	client.add(filePath, { path: downloadFolder }, (torrent) => {
		console.log("Torrent Added.");
		torrent.on("done", () => {
			console.log("Torrent Download Done.");
			ipcMain.emit('updateTorrentProgress', -1);
			torrent.destroy();
		});

		// Sets polling to front-end specific listeners
		setInterval(() => {
			if (torrent.progress < 1) {
				console.log(`Torrent.progress: ${torrent.progress}`);
				ipcMain.emit("updateTorrentProgress", torrent.progress);
			}
		}, 1000);
	});
}
