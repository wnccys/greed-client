"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var bencode_ts_1 = require("bencode-ts");
var crypto = require("crypto");
try {
    var torrent = bencode_ts_1.Bencode.decode(fs.readFileSync('660725.torrent'));
    var announce = torrent.announce.toString(); // URL do rastreador
    var name_1 = torrent['info']['name'].toString(); // Nome do arquivo
    var pieceLength = torrent['info']['piece length']; // Tamanho das partes
    // Calcula o hash SHA-1 da chave 'info'
    var infoBuffer = Buffer.from(bencode_ts_1.Bencode.encode(torrent['info']));
    var infoHash = crypto.createHash('sha1').update(infoBuffer).digest('hex');
    // Obtém as hashes das partes
    var piecesBuffer = torrent['info'].pieces;
    var numPieces = piecesBuffer.length / 20; // Cada hash SHA-1 tem 20 bytes
    var pieceHashes = [];
    for (var i = 0; i < numPieces; i++) {
        var start = i * 20;
        var end = start + 20;
        var hash = piecesBuffer.slice(start, end).toString('hex');
        pieceHashes.push(hash);
    }
    console.log('Announce:', announce);
    console.log('Name:', name_1);
    console.log('Piece Length:', pieceLength);
    console.log('InfoHash:', infoHash);
    console.log('Piece Hashes:', pieceHashes);
}
catch (err) {
    console.error('Erro ao ler o arquivo:', err);
}
