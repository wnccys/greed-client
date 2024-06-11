import fs from 'fs';
import bencode from 'bencode';

const torrent = bencode.decode(fs.readFileSync('puppy.torrent'));
console.log(torrent.announce.toString('utf-8'));