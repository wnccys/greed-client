import WebTorrent from "webtorrent";
import path from "node:path"
import fs from "node:fs";
import { ipcMain } from "electron";

const client = new WebTorrent();

export async function initTorrentDownload(
	filePath: string,
	downloadFolder: string,
) {
	console.log(
		"Checked if file exists: ",
		path.join(downloadFolder, path.basename(filePath)),
	);

	if (fs.existsSync(path.join(downloadFolder, path.basename(filePath)))) {
		console.log("File already exists at: ", downloadFolder);
		return;
	}

	client.add(
		filePath,
		{ path: downloadFolder },
		(torrent) => {
			console.log("Download path is: ", downloadFolder);
			console.log("magnet URI: ", torrent.magnetURI, "\n");

			torrent.on("download", () => {
				console.log(`progress: ${(torrent.progress * 100).toFixed(2)}%`);
				console.log(
					`Time remaining: ${(torrent.timeRemaining / 1000 / 60).toFixed(0)} minutes.`,
				);

				console.log(ipcMain.emit('updateTorrentProgress', torrent.progress));
			});

			torrent.on("done", () => {
				console.log("Torrent Download Complete.");

				torrent.destroy();
			});
		},
	);

	client.on("error", (err) => {
		console.error("WebTorrent Error: ", err);
	});
}