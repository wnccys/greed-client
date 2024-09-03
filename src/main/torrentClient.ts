import WebTorrent, { type Torrent } from "webtorrent";
import { ipcMain } from "electron";
// import { syncronizeQueue } from "./model";


const client = new WebTorrent();
registerClientEvents(client);
// let currentTorrentInterval: ReturnType<typeof setInterval>;


export async function initTorrentDownload(
	magnetURI: string,
	downloadFolder: string,
) {
	if (await client.get(magnetURI)) {
		console.log("Cannot duplicate torrent.");
		return;
	}

	let currentTorrent = setCurrentTorrent(magnetURI, downloadFolder);
	// currentTorrentInterval = registerTorrentEvents(currentTorrent);

	ipcMain.handle("pauseTorrent", () => {
		currentTorrent.pause();
		ipcMain.emit("updateTorrentPauseStatus", currentTorrent.paused);
		// clearInterval(currentTorrentInterval);
		client.remove(magnetURI);
	});

	ipcMain.handle("resumeTorrent", () => {
		// clearInterval(currentTorrentInterval);
		currentTorrent = setCurrentTorrent(magnetURI, downloadFolder);
		// currentTorrentInterval = registerTorrentEvents(currentTorrent);
		ipcMain.emit("updateTorrentPauseStatus", currentTorrent.paused);
	});

	ipcMain.handle("removeTorrent", () => {
		// clearInterval(currentTorrentInterval);
		client.remove(magnetURI, {
			destroyStore: true,
		});
		ipcMain.emit("updateTorrentInfos", -1);
		ipcMain.emit("updateTorrentProgress", -1);
	});
}

function setCurrentTorrent(magnetURI: string, downloadFolder: string) {
	client.torrents.map((torrent) => {
		torrent.pause();
	});

	const currentTorrent = client.add(
		magnetURI,
		{ path: downloadFolder },
		(torrent) => {
			console.log("Torrent Added.");
			torrent.on("done", () => {
				console.log("Torrent Download Done.");
				ipcMain.emit("updateTorrentProgress", -1);
				ipcMain.emit("torrentDownloadComplete");
				torrent.destroy();
			});
		},
	);

	return currentTorrent;
}

function registerClientEvents(client: WebTorrent.Instance) {
	return setInterval(() => {
		for (const torrent of client.torrents) {
			if (torrent.progress < 1 && !torrent.paused) {
				console.log(`Torrent.progress: ${torrent.progress}`);
				ipcMain.emit(
					"updateTorrentInfos",
					torrent.progress,
					torrent.name,
					torrent.magnetURI,
					torrent.timeRemaining / 1000 / 60,
					torrent.downloadSpeed,
					torrent.downloaded,
					torrent.length,
					torrent.paused,
					torrent.numPeers,
				);

				ipcMain.emit("updateTorrentProgress", torrent.progress);
			}
		}
	}, 1000);
}


  
