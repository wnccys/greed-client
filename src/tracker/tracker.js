"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPeers = void 0;
var dgram = require("dgram");
var url = require("url");
var TorrentParser = require("torrentParser");
var utils = require("utils");
var crypto = require("crypto");
var getPeers = function (torrent, callback) {
    var socket = dgram.createSocket('udp4');
    udpSend(socket, buildConnReq(), torrent.announce);
    socket.on('message', function (response) {
        if (respType(response) === 'connect') {
            var connResp = parseConnResp(response);
            var announceReq = buildAnnounceReq(connResp.connectionId, torrent);
            udpSend(socket, announceReq, torrent.announce);
        }
        else if (respType(response) === 'announce') {
            var announceResp = parseAnnounceResp(response);
            callback(announceResp.peers);
        }
    });
};
exports.getPeers = getPeers;
function udpSend(socket, message, rawUrl, callback) {
    if (callback === void 0) { callback = function () { }; }
    var parsedUrl = url.parse(rawUrl);
    socket.send(message, 0, message.length, Number(parsedUrl.port), String(parsedUrl.host), callback);
}
function respType(resp) {
    var action = resp.readUInt32BE(0);
    if (action == 0)
        return 'connect';
    return 'announce';
}
function buildConnReq() {
    var buf = Buffer.alloc(16);
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
function parseConnResp(resp) {
    return {
        action: resp.readUInt32BE(0),
        transactionId: resp.readUInt32BE(4),
        connectionId: resp.slice(8),
    };
}
function buildAnnounceReq(connId, torrent, port) {
    if (port === void 0) { port = 6881; }
    var buf = Buffer.allocUnsafe(98);
    // connection id
    connId.copy(buf, 0);
    // action
    buf.writeUInt32BE(1, 8);
    // transaction id
    crypto.randomBytes(4).copy(buf, 12);
    // info hash
    TorrentParser.infoHash(torrent).copy(buf, 14);
    // peerId
    utils.genId().copy(buf, 36);
    // downloaded
    Buffer.alloc(8).copy(buf, 56);
    // left from dowloaded
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
function parseAnnounceResp(resp) {
    //
    // iterates over sliced buffer, incrementing over each returned IP 
    // considering it's offset, so 20 + (6 * n) where 20 is the offset 
    // where the first IP sits and n the returned IP index incrementing
    // until all IPs are covered.
    //
    function group(iterable, groupSize) {
        var groups = [];
        for (var i = 0; i < iterable.length; i += groupSize) {
            groups.push(iterable.slice(i, i + groupSize));
        }
        return groups;
    }
    // returns response based at announce resp specification;
    return {
        action: resp.readUInt32BE(0),
        transactionId: resp.readUInt32BE(4),
        leechers: resp.readUInt32BE(8),
        seeders: resp.readUInt32BE(12),
        peers: group(resp.slice(20), 6).map(function (address) {
            return {
                ip: address.slice(0, 4).join('.'),
                port: address.readUInt16BE(4)
            };
        })
    };
}
