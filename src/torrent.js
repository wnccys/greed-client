"use strict";
const createTorrent = require('create-torrent');
const fs = require('fs');
const directoryPath = 'Users\Aluno_Tarde\Downloads\Daniel l\myTorrent';
createTorrent(directoryPath, (err, torrent) => {
    if (!err) {
        fs.writeFileSync('my.torrent', torrent);
        console.log('Torrent criado com sucesso!');
    }
    else {
        console.error('Erro ao criar torrent:', err);
    }
});
