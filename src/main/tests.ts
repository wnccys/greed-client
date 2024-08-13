import { initTorrentDownload } from "./torrentClient";
import path from "node:path";
// import fs from "node:fs"

export function handleStartTorrentDownload() {
    const filePath = path.resolve("./src/dummy_files/heavy.torrent");
    const downloadFolder = path.resolve("./src/downloads/");
    // const fileExists = fs.existsSync(`${downloadFolder}/Tears Of Steel`);

    // if (fileExists) { 
    //     fs.unlinkSync(`${downloadFolder}/Tears Of Steel`) 
    // };

    initTorrentDownload(
        filePath,
        downloadFolder,
    );
}