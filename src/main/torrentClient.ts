import WebTorrent, { type Torrent } from "webtorrent";
import { ipcMain, type IpcMainEvent } from "electron";

const client = new WebTorrent();

export async function initTorrentDownload(
	filePath: string,
	downloadFolder: string,
) {
	client.add(filePath, { path: downloadFolder }, (torrent) => {
		console.log("Torrent Added.");
		torrent.on("done", () => {
			console.log("Torrent Download Done.");
			ipcMain.emit("updateTorrentProgress", -1);
			torrent.destroy();
		});

		ipcMain.handle('resumePauseTorrent', () => {
			torrent.paused ? torrent.resume() : torrent.pause();
		});

		setInterval(() => {
			if (torrent.progress < 1) {
				console.log(`Torrent.progress: ${torrent.progress}`);
				ipcMain.emit(
					"updateTorrentProgress",
					torrent.progress,
					torrent.name,
					((torrent.timeRemaining / 1000) / 60),
					torrent.downloadSpeed,
					torrent.downloaded,
					torrent.length,
					torrent.paused,
				);
			}
		}, 1000);
	});
}