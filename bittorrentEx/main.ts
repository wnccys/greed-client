import fs from 'fs';
import { Bencode } from 'bencode-ts';
import * as dgram from 'dgram';
import * as url from 'url';

const torrent = Bencode.encode(fs.readFileSync('./puppy.torrent'));
const urlParsed = url.parse(torrent.toString('utf8'));
console.log(urlParsed);