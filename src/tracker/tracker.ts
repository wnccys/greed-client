import fs from 'fs';
import { Bencode } from 'bencode-ts';
import * as dgram from 'dgram';
import * as url from 'url';
import { Torrent } from '@customTypes/torrent';
import * as crypto from 'crypto';

export const getPeers = (torrent: Torrent, callback: Function) => {
    const socket = dgram.createSocket('udp4');

    // 1. sends handshake request
    udpSend(socket, buildConnReq(), torrent.announce);

    socket.on('message', response => {
        if (respType(response) === 'connect') {
            // 2. receive and parse handshake response
            const connResp = parseConnResp(response);
            // 3. seed announce request to tracker
            const announceReq = buildAnnounceReq(connResp.connectionId);

            // REVIEW possible torrent.announce url error.
            udpSend(socket, announceReq, torrent.announce);
        } else if (respType(response) === 'announce') {
            // 4. parse announce response
            const announceResp = parseAnnounceResp(response);

            // 5. pass peers to callback
            callback(announceResp.peers);
        }
    });
};

function udpSend(socket: dgram.Socket, message: Buffer, rawUrl: string, callback=()=>{}) {
    const parsedUrl = url.parse(rawUrl);
    socket.send(message, 0, message.length,
        Number(parsedUrl.port), parsedUrl.host || undefined, callback);
}

function respType(resp: any): string {
    return "none"
}

function buildConnReq (): Buffer {
    const buf = Buffer.alloc(16);

    // writes to buffer with BEP specification
    // http://www.bittorrent.org/beps/bep_0015.html
    buf.writeUInt32BE(0x417, 0);
    buf.writeUInt32BE(0x27101980, 4);
    buf.writeUInt32BE(0, 8);
    crypto.randomBytes(4).copy(buf, 12);

    return buf;
}

function parseConnResp(resp: any): any { 
    // 
}

function buildAnnounceReq(connId: string): any {
    //
}

function parseAnnounceResp(resp: any): any {
    //
}