import { initTorrentDownload } from 'torrentClient';
import multer from 'multer';
import cors from 'cors';
import express from 'express';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

const app = express();
const port = 5172;
app.use(cors());

const storage = multer.diskStorage({
    destination: dirname(__filename) + '/downloads',
    filename: (req, file, cb) => {
        cb(null, file.originalname.replace('.torrent', '') + 
            '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        checkFileType(file, cb);
    }
}).single('torrentFile');

function checkFileType(file: Express.Multer.File, cb: any) {
    console.log('received file: ', file);
    const mimeType = file.mimetype === 'application/octet-stream';

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
            console.log('error: ', err);
        } else {
            if (req.file == undefined) {
                res.status(400).send('No file selected!');
            } else {
                res.send({
                    message: 'File Uploaded Successfully',
                    filePath: `downloads/${req.file.filename}`,
                });
            }
        }
    });
});

app.listen(port, () => {
    console.log(`server working at: localhost:${port}`);
});