import WebTorrent, { TorrentFile } from 'webtorrent';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const torrentPath = path.join(
    __dirname, 
    '/torrent_files/heavy.torrent'
);

const client = new WebTorrent();

fs.readFile(torrentPath, (err, data) => {
    if (err) {
        console.error('error reading torrent file: ', err);
        return;
    }

    client.add(data, { path: path.join(__dirname, 'downloads') }, (torrent) => {
        console.log('torrent info hash: ', torrent.infoHash)
        console.log('magnet URI: ', torrent.magnetURI);

        torrent.on('download', (bytes) => {
            console.log(`downloaded: ${(bytes/1000).toFixed(1)} megabytes.`);
            console.log(`progress: ${(torrent.progress * 100).toFixed(2)}%`);
        });

        torrent.on('done', () => {
            console.log(`torrent download finished: ${torrent.name}`);
            client.destroy();
        });

        console.log('download speed: ', client.downloadSpeed);
    });

    client.on('error', (err) => {
        console.error('WebTorrent error: ', err);
    });
});