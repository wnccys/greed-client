import { initTorrentDownload } from 'torrentClient';
import multer from 'multer';
import cors from 'cors';
import express from 'express';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

// TODO make request with file path 
// so server doesn't needs to process it's multer
// WHEN SCRAPPER IS IMPLEMENTED ^
const __filename = fileURLToPath(import.meta.url);

// creates server and applies cors middleware 
// for localhost connections handling
const app = express();
const port = 5172;
app.use(cors());

// define middleware to handle uploaded file
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
    const mimeType = file.mimetype === 
    'application/x-bittorrent' 
    || 
    'application/octet-stream';

    if (mimeType) {
       return cb(null, true);
    } else {
        cb(new Error('Error: Torrent Files Only!'));
    }
};

// dummy route;
app.get('/', (req, res) => {
    res.send('hello!');
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
                const filePath = path.join(
                    dirname(__filename), '/torrent_files/', req.file.filename
                );
                const downloadFolder = path.join(dirname(__filename), '/downloads/');
                const file = fs.readFileSync(filePath);

                initTorrentDownload(file, filePath, downloadFolder);
            }
        }
    });
});

app.listen(port, () => {
    console.log(`server working at: localhost: ${port}`);
});