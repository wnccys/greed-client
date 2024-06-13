import fs from 'fs';
// import { Bencode } from 'bencode-ts';
import parseTorrent from 'parse-torrent';
import * as dgram from 'dgram';
import * as url from 'url';

const parsedTorrent = parseTorrent(fs.readFileSync('./puppy.torrent'));
console.log(parsedTorrent);