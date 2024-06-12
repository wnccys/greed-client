import fs from 'fs';
import { Bencode } from 'bencode-ts';
import * as dgram from 'dgram';
import * as urlLib from 'url';

const torrent = Bencode.encode(fs.readFileSync('./puppy.torrent'));
// FIXME verify port integrity
const url = urlLib.parse(torrent.toString('utf-8'));
console.log(url);
const socket = dgram.createSocket('udp4');
const myMsg = Buffer.from('hello?', 'utf-8');

// sends message(handshake string 'hello') 
// as a buffer from the previously url infos;
socket.send(myMsg,
    0, myMsg.length,
    Number(url.port),
    url.host || undefined, () => {});

socket.on('message', msg => {
    console.log("message from tracker: ", msg);
});

console.log(torrent.toString('utf-8'));