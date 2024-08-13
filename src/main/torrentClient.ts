import WebTorrent from "webtorrent";
import { ipcMain } from "electron";

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

		// Sets polling to front-end specific listeners
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
				);
			}
		}, 1000);
	});
}

export async function pauseTorrentDownload(torrentId: string) {
	const torrent = client.get(torrentId);
	if (torrent) {
		console.log(torrent);
		return;
	}

	console.log("Invalid Torrent Id.");
}
