import * as fs from 'fs';
import { Bencode} from 'bencode-ts';
import * as crypto from 'crypto';

try {
    const torrent = Bencode.decode(fs.readFileSync('660725.torrent'));
    const announce = torrent.announce.toString(); // URL do rastreador
    const name = torrent['info']['name'].toString(); // Nome do arquivo
    const pieceLength = torrent['info']['piece length']; // Tamanho das partes

    // calcula o hash SHA-1 do 'info'
    const infoBuffer = Buffer.from(Bencode.encode(torrent['info']));
    const infoHash = crypto.createHash('sha1').update(infoBuffer).digest('hex');

    // hahs das pieces
    const piecesBuffer = torrent['info'].pieces as Buffer;
    const numPieces = piecesBuffer.length / 20; //cada hash com 20 bytes
    const pieceHashes: string[] = [];
    for (let i = 0; i < numPieces; i++) {
        const start = i * 20;
        const end = start + 20;
        const hash = piecesBuffer.slice(start, end).toString('hex');
        pieceHashes.push(hash);
    }

    console.log('Announce:', announce);
    console.log('Name:', name);
    console.log('Piece Length:', pieceLength);
    console.log('InfoHash:', infoHash);
    console.log('Piece Hashes:', pieceHashes);
} catch (err) {
    console.error('Erro ao ler o arquivo:', err);
}
