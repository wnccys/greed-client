import WebTorrent from "webtorrent";
import { ipcMain } from "electron";

const client = new WebTorrent();

export async function initTorrentDownload(
	filePath: string,
	downloadFolder: string,
) {
	let currentTorrent = client.add(filePath, { path: downloadFolder }, (torrent) => {
		console.log("Torrent Added.");
		torrent.on("done", () => {
			console.log("Torrent Download Done.");
			ipcMain.emit("updateTorrentProgress", -1);
			torrent.destroy();
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

	ipcMain.handle('pauseTorrent', () => {
		currentTorrent.pause();
		console.log("paused");
		client.remove(currentTorrent);
	});

	// NOTE verify for torrent magnetlink to substitute filePath and storeOpts
	// https://github.com/webtorrent/webtorrent/issues/1004
	ipcMain.handle('resumeTorrent', () => {
		// currentTorrent.resume();
		console.log("resumed");

		const newTorrent = client.get(currentTorrent);
		if (newTorrent) {
			currentTorrent = client.add(filePath, { path: downloadFolder });
			console.log("paused? ", currentTorrent.paused);
			return
		} 

		console.log("could not get torrent Client");
	});
}