import fs from 'fs';
import { Bencode } from 'bencode-ts';
import * as dgram from 'dgram';
import * as url from 'url';
import { Torrent } from '@types/types';
import { ConnectionOptions } from 'tls';

export const getPeers = (torrent: Torrent, callback: Function) => {
    const socket = dgram.createSocket('udp4');

    // 1. sends handshake request
    udpSend(socket, buildConnReq(), torrent.announce);

    socket.on('message', (response) => {
        if (respType(response) === 'connect') {
            // 2. receive and parse handshake response
            const connResp = parseConnResp(response);
            // 3. seed announce request to tracker
            const announceReq = buildAnnounceReq(connResp.connectionId);

            udpSend(socket, announceReq, torrent.announce);
        } else if (respType(response) === 'announce') {
            // 4. parse announce response
            const announceResp = parseAnnounceResp(response);

            // 5. pass peers to callback
            callback(announceResp.peers);
        }
    });
};

function udpSend(socket: dgram.Socket, message: any, rawUrl: string, callback=()=>{}) {
    const parsedUrl = url.parse(rawUrl);
    socket.send(message, 0, message.length, 
        Number(parsedUrl.port), parsedUrl.host || undefined, callback);
}

function respType(resp: any): string {
    //
}

function buildConnReq () {
    //
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