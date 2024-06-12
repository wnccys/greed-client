import fs from 'fs';
import { Bencode } from 'bencode-ts';

const torrent = Bencode.encode(fs.readFileSync('./puppy.torrent'));
console.log(torrent.toString('utf-8'));