import WebTorrent, { TorrentFile } from 'webtorrent';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const client = new WebTorrent();

// NOTE probably we gonna use only magnets;
// Possibly adds generic torrent handler (accepts files, magnets, infohashes etc.);
export function initTorrentDownload(torrentFile: Buffer, filePath: string) { 
    client.add(torrentFile , { path: path.join(__dirname, 'downloads') }, (torrent) => {
        console.log('torrent info hash: ', torrent.infoHash)
        console.log('magnet URI: ', torrent.magnetURI);
        torrent.on('download', (bytes) => {
            console.log(`downloaded: ${(bytes/1000).toFixed(1)} megabytes.`);
            console.log(`progress: ${(torrent.progress * 100).toFixed(2)}%`);
            console.log(`time remaining: ${(torrent.timeRemaining/1000/60).toFixed(2)} minutes.`);
        });

        torrent.on('done', () => {
            try {
                fs.unlinkSync(filePath);
                torrent.destroy();
                console.log("fodase");
            } catch(e) {
                console.error("error deleting temp torrent file: ", e);
            }
        });
    });

    client.on('error', (err) => {
        console.error('WebTorrent error: ', err);
    });
};