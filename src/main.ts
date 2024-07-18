import { initTorrentDownload } from 'torrentClient';
import { MagneticLinkURI } from 'Ariac/ariac'; 
import multer from 'multer';
import cors from 'cors';
import express from 'express';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);

const app = express();
const port = 5172;
app.use(cors());
app.use(express.json());

const upload = multer({
    storage: multer.diskStorage({
        destination: dirname(__filename) + '/torrent_files',
        filename: (req, file, cb) => {
            cb(null, file.originalname)
        },
    }),
    fileFilter: (req, file, cb) => {
        checkMimeType(file, cb);
    },
}).single('torrentFile');

function checkMimeType(file: Express.Multer.File, cb: Function) {
    const mimeType = file.mimetype === 'application/x-bittorrent' || 'application/octet-stream';

    if (mimeType) {
       return cb(null, true);
    } else {
        cb(new Error('Error: Torrent Files Only!'));
    }
}

app.get('/', (req, res) => {
    res.send('Hello!');
});

app.post('/download', async (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            res.status(400).send(err.message);
            console.log('Error at file upload: ', err);
        } else {
            if (req.file == undefined) {
                res.status(400).send('No file selected!');
            } else {
                const filePath = path.join(dirname(__filename), '/torrent_files/', req.file.filename);
                const downloadFolder = path.join(dirname(__filename), '/downloads/');
                const file = fs.readFileSync(filePath);

                initTorrentDownload(file, filePath, downloadFolder);
                res.status(200).send('Download started!');
            }
        }
    });
});

app.post('/magnetic', async (req, res) => {
    const magnetLink = req.body.magnetLink; // Link magnético no body da requisição

    if (magnetLink) {
        try {
            await MagneticLinkURI(magnetLink); // Usa o link magnético fornecido na requisição
            res.status(200).send('Download started!');
        } catch (error: any) {
            res.status(500).send('Error starting download: ' + error.message);
        }
    } else {
        res.status(400).send('Magnetic link expected!');
    }
});

app.listen(port, () => {
    console.log(`Server running at: http://localhost:${port}`);
});
