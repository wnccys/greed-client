import multer from 'multer';
import express from 'express';
import cors from 'cors';

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