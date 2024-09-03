import WebTorrent, { type Torrent } from "webtorrent";
import { ipcMain, type IpcMainInvokeEvent } from "electron";
import { addToQueue, getDBCurrentPath, pauseOnQueue, removeFromQueue, resumeOnQueue, syncronizeQueue, verifyIfOnQueue } from "./model";

const client = new WebTorrent();
let currentTorrent: Torrent;

registerClientEvents(client);
ipcMain.handle("pauseTorrent", async () => {
	ipcMain.emit("updateTorrentPauseStatus", true);
	ipcMain.emit("updateTorrentInfos", -1);
	ipcMain.emit("updateTorrentProgress", -1);
	currentTorrent.pause();
	await pauseOnQueue(currentTorrent.magnetURI);
	client.remove(currentTorrent.magnetURI);

	await sendCurrentQueue();
});

ipcMain.handle("resumeTorrent", async (_event: IpcMainInvokeEvent, magnetURI) => {
	ipcMain.emit("updateTorrentPauseStatus", false);
	const downloadFolder = await getDBCurrentPath();
	currentTorrent = await setCurrentTorrent(magnetURI, downloadFolder);
	await resumeOnQueue(currentTorrent.magnetURI);
	ipcMain.emit("isNoLongerLoading");

	await sendCurrentQueue();
});

ipcMain.handle("removeTorrent", async (_event, magnetURI: string) => {
	removeFromQueue(magnetURI).then(() => {
		currentTorrent.removeAllListeners();
		client.remove(currentTorrent.magnetURI, {
			destroyStore: true,
		});
		ipcMain.emit("updateTorrentInfos", -1);
		ipcMain.emit("updateTorrentProgress", -1);
	});

	await sendCurrentQueue();
});

export async function addTorrentToQueue(
	magnetURI: string,
) {
	if (await client.get(magnetURI)) {
		console.log("Cannot duplicate torrent.");
		return;
	}

	if (await verifyIfOnQueue(magnetURI)) {
		console.log("duplicated by verify");
	}

	if (currentTorrent) {
		ipcMain.emit("updateTorrentPauseStatus", true);
		ipcMain.emit("updateTorrentInfos", -1);
		ipcMain.emit("updateTorrentProgress", -1);
		currentTorrent.pause();
		await pauseOnQueue(currentTorrent.magnetURI);
		client.remove(currentTorrent.magnetURI);

		currentTorrent.removeAllListeners("ready");
		await sendCurrentQueue();

		ipcMain.emit("isNoLongerLoading");
	}

	const downloadFolder = await getDBCurrentPath();
	currentTorrent = await setCurrentTorrent(magnetURI, downloadFolder);

	currentTorrent.on("metadata", async () => {
		await addToQueue({ 
			torrentId: currentTorrent.magnetURI, 
			name: currentTorrent.name,
			progress: (currentTorrent.progress * 100).toFixed(1),
			size: (currentTorrent.length / 1000000).toFixed(0)
		});
	});

	await sendCurrentQueue();
}

async function setCurrentTorrent(magnetURI: string, downloadFolder: string) {
	for (const torrent of client.torrents) {
		torrent.pause();
		pauseOnQueue(torrent.magnetURI).then(() => client.remove(magnetURI));
	};

	const currentTorrent = await client.add(
		magnetURI,
		{ path: downloadFolder },
		(torrent) => {
			console.log("Torrent Added.");
			torrent.on("done", () => {
				console.log("Torrent Download Done.");
				ipcMain.emit("updateTorrentInfos", -1);
				ipcMain.emit("updateTorrentProgress", -1);
				ipcMain.emit("removeTorrent", torrent.magnetURI);
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
					torrent.numPeers,
					torrent.length,
				);

				ipcMain.emit("updateTorrentProgress", torrent.progress);
			}
		}
	}, 1000);
}

export async function sendCurrentQueue() {
	ipcMain.emit("updateQueueItems", await syncronizeQueue());
}