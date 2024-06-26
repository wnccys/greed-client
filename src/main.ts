import WebTorrent from 'webtorrent';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const torrentPath = path.join(
    __dirname, 
    './src/torrent_files/tears-of-steel.torrent'
);

const client = new WebTorrent();

fs.readFile(torrentPath, (err, data) => {
    if (err) {
        console.error('error reading torrent file: ', err);
        return;
    }

    client.add(data, { path: path.join(__dirname, 'downloads') }, (torrent) => {
        console.log('torrent info hash: ', torrent.infoHash)

        torrent.on('download', (bytes) => {
            console.log(`downloaded: ${bytes} bytes.`);
            console.log(`progress: ${(torrent.progress * 100).toFixed(2)}%`);
        });

        torrent.on('done', () => {
            console.log(`torrent download finished.`);
            client.destroy();
        });

        torrent.files.forEach((file) => {
            const filePath = path.join(__dirname, 'downloads', file.path);
            console.log(`downloading: ${file.name}`);

            file.getBuffer((err, buffer) => {
                if (err) throw err;
                fs.writeFileSync(filePath, buffer);
                console.log(`${file.name} has been downloaded to ${filePath}`);
            });
        });
    });

    client.on('error', (err: any) => {
        console.error('WebTorrent error: ', err.message);
    });
});