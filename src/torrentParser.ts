import { Bencode } from 'bencode-ts';
import { Torrent } from '@classes/torrent';
import fs from 'fs';
import crypto from 'crypto';

export function open(filepath: string): any {
    return Bencode.decode(fs.readFileSync(filepath));
}

export function size(torrent: Torrent): Buffer {
    // REVIEW - verify if it needs decoded pieces;
    const size = torrent.info.files ? 
        torrent.info.files.map(file => file.length).reduce((a, b) => a+b) :
        torrent.info['piece-length'];

    let buf = Buffer.alloc(8); 
    buf.writeBigInt64BE(size, 0);
    // REVIEW check for BigInt require;
    return buf;
}

export function infoHash(torrent: Torrent): Buffer {
    // NOTE - possibly use console-ninja to debug torrent.info;
    const info = Bencode.encode(torrent.info);
    return crypto.createHash('sha1').update(info).digest();
}