import WebTorrent, { TorrentFile } from 'webtorrent';
import path from 'path';
import express from 'express';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const client = new WebTorrent();

// NOTE probably we gonna use only magnets;
// Possibly adds generic torrent handler (accepts files, magnets, infohashes etc.);
function initTorrentDownload(torrentFile?: File) { 
    if (!torrentFile) return

    client.add(torrentFile , { path: path.join(__dirname, 'downloads') }, (torrent) => {
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
};

const app = express();
const port = 5172;

app.use(cors());

app.get('/', (req, res) => {
    res.send('hello!');
});

app.post('/download', async (req, res) => {
    console.log("response sent: ", req.body);
    res.send(req.body);
    // initTorrentDownload();
});

app.listen(port, () => {
    console.log(`server listening at port: ${port}`);
});