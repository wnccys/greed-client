import fs from 'fs';
import { Bencode } from 'bencode-ts';
import * as dgram from 'dgram';
import * as url from 'url';

const torrent = Bencode.decode(fs.readFileSync('./tears-of-steel.torrent'), 'utf-8');
const urlParsed = url.parse(torrent.announce.toString('utf8'));
console.log(urlParsed);