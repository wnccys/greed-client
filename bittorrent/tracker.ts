import fs from 'fs';
import { Bencode } from 'bencode-ts';
import * as dgram from 'dgram';
import * as url from 'url';

const torrent = Bencode.decode(fs.readFileSync('./tears-of-steel.torrent'));

module.exports.getPeers = (torrent, callback) => {
    const socket = dgram.createSocket('udp4');
    const parsedUrl = torrent.announce.toString('utf-8');

    // 1. sends handshake request
    udpSend(socket, buildConnReq(), parsedUrl);

    socket.on('message', () => {
        if (respType(response) === 'connect') {
            // 2. receive and parse handshake response
            const connResp = parseConnResp(response);
            // 3. seed announce request to tracker
            const announceReq = buildAnnounceReq(connResp.connectionId);

            udpSend(socket, announceReq, url);
        } else if (respType(response) === 'announce') {
            // 4. parse announce response
            const announceReq = parseAnnounceResp(response);

            // 5. pass peers to callback
            callback(announceResp.peers);
        }
    });
};

function udpSend(socket, message, rawUrl, callback=()=>{}) {
    const parsedUrl = url.parse(rawUrl);
    socket.send(message, 0, message.length, url.port, url.host, callback);
}

function respType(resp) {
    //
}

function buildConnReq () {
    //
}

function parseConnResp(resp) { 
    // 
}

function buildAnnounceReq(connId) {
    //
}

function parseAnnounceResp(resp) {
    //
}