import WebTorrent, { type Torrent } from "webtorrent";
import { ipcMain, type IpcMainInvokeEvent } from "electron";
import { addToQueue, getDBCurrentPath, pauseOnQueue, removeFromQueue } from "./model";
// import { syncronizeQueue } from "./model";

const client = new WebTorrent();
let currentTorrent: Torrent;

registerClientEvents(client);
ipcMain.handle("pauseTorrent", () => {
	currentTorrent.pause();
	ipcMain.emit("updateTorrentPauseStatus", currentTorrent.paused);
	client.remove(currentTorrent.magnetURI);
});

ipcMain.handle("resumeTorrent", async (_event: IpcMainInvokeEvent, magnetURI) => {
	const downloadFolder = await getDBCurrentPath();
	currentTorrent = setCurrentTorrent(magnetURI, downloadFolder);
	ipcMain.emit("updateTorrentPauseStatus", currentTorrent.paused);
});

ipcMain.handle("removeTorrent", () => {
	removeFromQueue(currentTorrent.magnetURI).then(() => {
		client.remove(currentTorrent.magnetURI, {
			destroyStore: true,
		});
		ipcMain.emit("updateTorrentInfos", -1);
		ipcMain.emit("updateTorrentProgress", -1);
	});
});

export async function addTorrentToQueue(
	magnetURI: string,
) {
	if (await client.get(magnetURI)) {
		console.log("Cannot duplicate torrent.");
		return;
	}

	const downloadFolder = await getDBCurrentPath();
	currentTorrent = setCurrentTorrent(magnetURI, downloadFolder);

	await addToQueue({ 
		torrentId: currentTorrent.magnetURI, 
		name: currentTorrent.name,
		size: currentTorrent.length
	});
}

function setCurrentTorrent(magnetURI: string, downloadFolder: string) {
	for (const torrent of client.torrents) {
		torrent.pause();
		pauseOnQueue(torrent.magnetURI).then(() => client.remove(magnetURI));
	};

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
