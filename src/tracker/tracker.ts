import * as dgram from 'dgram';
import * as url from 'url';
import { Torrent, TrackerConnResponse , TrackerAnnounceResponse} 
    from '@customTypes/torrent';
import * as TorrentParser from 'torrentParser';
import * as utils from 'utils';
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
            const announceReq = buildAnnounceReq(connResp.connectionId, torrent);

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

function buildConnReq(): Buffer {
    const buf = Buffer.alloc(16);

    // writes to buffer with BEP specification
    // http://www.bittorrent.org/beps/bep_0015.html
    buf.writeUInt32BE(0x417, 0);
    buf.writeUInt32BE(0x27101980, 4);
    buf.writeUInt32BE(0, 8);
    crypto.randomBytes(4).copy(buf, 12);

    return buf;
}

// extracts information from tracker 
// handshake response incoming buffer
function parseConnResp(resp: Buffer): TrackerConnResponse { 
    return {
        action: resp.readUInt32BE(0),
        transactionId: resp.readUInt32BE(4),
        connectionId: resp.slice(8),
    }
}

function buildAnnounceReq(connId: Buffer, torrent: Torrent, port=6881): Buffer {
    const buf = Buffer.allocUnsafe(98);

    // connection id
    connId.copy(buf, 0);
    // action
    buf.writeUInt32BE(1, 8);
    // transaction id
    crypto.randomBytes(4).copy(buf, 12);
    // info hash
    // TODO sets infoHash return to hash-itself
    TorrentParser.infoHash(torrent).copy(buf, 14);
    // peerId
    utils.genId().copy(buf, 36);
    // downloaded
    Buffer.alloc(8).copy(buf, 56);
    // left from dowloaded
    // TODO impl size method to torrentParser
    TorrentParser.size(torrent).copy(buf, 64);
    // uplodaded 
    Buffer.alloc(8).copy(buf, 72);
    // event
    buf.writeUInt32BE(0, 80);
    // ip address
    buf.writeUInt32BE(0, 80);
    // key
    crypto.randomBytes(4).copy(buf, 88);
    // num want
    buf.writeInt32BE(-1, 92);
    // port
    buf.writeInt32BE(port, 96);

    return buf;
}

function parseAnnounceResp(resp: Buffer): TrackerAnnounceResponse {
    // iterates over sliced buffer, incrementing over each returned IP 
    // considering it's offset, so 20 + (6 * n) where 20 is the offset 
    // where the first IP sits and n the returned IP index incrementing
    // until all IPs are covered.
    function group(iterable: Buffer, groupSize: number) {
        let groups = [];

        for(let i = 0; i < iterable.length; i += groupSize) {
            groups.push(iterable.slice(i, i + groupSize))
        }

        return groups;
    }

    return {
        action: resp.readUInt32BE(0),
        transactionId: resp.readUInt32BE(4),
        leechers: resp.readUInt32BE(8),
        seeders: resp.readUInt32BE(12),
        peers: group(resp.slice(20), 6).map(adress => {
            return {
                ip: adress.slice(0, 4).join('.'),
                port: adress.readUInt16BE(4)
            }
        })
    }
}