import { Bencode } from 'bencode-ts';
import { Torrent } from '@classes/torrent';
import fs from 'fs';
import crypto from 'crypto';

export function open(filepath: string): any {
    return Bencode.decode(fs.readFileSync(filepath));
}

export function size(torrent: Torrent): any {

}

export function infoHash(torrent: Torrent): Buffer {
// NOTE - possibly use console-ninja to debug torrent.info
    const info = Bencode.encode(torrent.info);
    return crypto.createHash('sha1').update(info).digest();
}