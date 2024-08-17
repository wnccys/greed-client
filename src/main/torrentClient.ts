import WebTorrent, { type Torrent } from "webtorrent";
import { ipcMain } from "electron";

const client = new WebTorrent();
let currentTorrentInterval: ReturnType<typeof setInterval>;

export async function initTorrentDownload(
	magnetURI: string,
	downloadFolder: string,
) {
	if (await client.get(magnetURI)) {
		console.log("Cannot duplicate torrent.");
		return;
	}

	let currentTorrent = setCurrentTorrent(magnetURI, downloadFolder);
	currentTorrentInterval = registerTorrentEvents(currentTorrent);

	ipcMain.handle("pauseTorrent", () => {
		currentTorrent.pause();
		client.remove(magnetURI);
	});

	ipcMain.handle("resumeTorrent", () => {
		clearInterval(currentTorrentInterval);
		currentTorrent = setCurrentTorrent(magnetURI, downloadFolder) 
		currentTorrentInterval = registerTorrentEvents(currentTorrent);
	});

	ipcMain.handle("removeTorrent", () => {
		clearInterval(currentTorrentInterval);
		client.remove(magnetURI, {
			destroyStore: true,
		});
		ipcMain.emit("updateTorrentProgress", -1);
	})
}

function setCurrentTorrent(magnetURI: string, downloadFolder: string) {
	const currentTorrent = client.add(
		magnetURI,
		{ path: downloadFolder },
		(torrent) => {
			console.log("Torrent Added.");
			torrent.on("done", () => {
				console.log("Torrent Download Done.");
				ipcMain.emit("updateTorrentProgress", -1);
				torrent.destroy();
			});
		},
	);

	return currentTorrent;
}

function registerTorrentEvents(torrent: Torrent) {
	return setInterval(() => {
		if (torrent.progress < 1) {
			console.log(`Torrent.progress: ${torrent.progress}`);
			ipcMain.emit(
				"updateTorrentProgress",
				torrent.progress,
				torrent.name,
				torrent.timeRemaining / 1000 / 60,
				torrent.downloadSpeed,
				torrent.downloaded,
				torrent.length,
				torrent.paused,
			);
		}
	}, 1000);
}
