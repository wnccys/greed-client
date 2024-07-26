import WebTorrent from "webtorrent";
import path from "node:path"
import fs from "node:fs";

const client = new WebTorrent();

// TODO returns success/error string catching it at its properly handle function
export async function initTorrentDownload(
	filePath: string,
	downloadFolder: string,
) {
	client.add(
		filePath,
		{ path: path.join(__dirname, "downloads") },
		(torrent) => {
			console.log("download path is: ", path.join(__dirname, "downloads"));
			console.log("\n torrent info hash: ", torrent.infoHash);
			console.log("magnet URI: ", torrent.magnetURI, "\n");

			console.log(
				"checked if file exists: ",
				path.join(downloadFolder, torrent.name),
			);

			if (fs.existsSync(path.join(downloadFolder, torrent.name))) {
				console.log("File already exists at: ", downloadFolder);
				return;
			}

			torrent.on("download", (bytes) => {
				console.log(`downloaded: ${(bytes / 1000).toFixed(1)} megabytes.`);
				console.log(`progress: ${(torrent.progress * 100).toFixed(2)}%`);
				console.log(
					`time remaining: ${(torrent.timeRemaining / 1000 / 60).toFixed(0)} minutes.`,
				);
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