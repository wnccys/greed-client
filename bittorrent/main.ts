import fs from 'fs';
import { Bencode } from 'bencode-ts';
import * as dgram from 'dgram';
import * as url from 'url';
import * as tracker from './tracker';

const torrent = Bencode.decode(fs.readFileSync('./tears-of-steel.torrent'), 'utf-8');
const urlParsed = url.parse(torrent.announce.toString('utf8'));
console.log(urlParsed.href);

const socket = dgram.createSocket('udp4');
const myMsg = Buffer.from('hello?', 'utf-8');

socket.send(myMsg, 0, myMsg.length, Number(urlParsed.port), urlParsed.hostname || undefined, (some) => console.log(some));

socket.on('message', (msg) => {
    console.log('message is: ', msg);
});

tracker.getPeers(torrent, peers => {
    console.log('list of peers: ', peers);
});