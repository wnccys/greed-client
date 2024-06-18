import fs from 'fs';
import { Bencode } from 'bencode-ts';
import * as dgram from 'dgram';
import * as url from 'url';
// uses tsconfig paths to proper module path
import { getPeers } from '@tracker/tracker';
import { Torrent, newTorrent } from '@customTypes/torrent';
import 'tsconfig-paths/register';

const torrentFile = './src/torrents/tears-of-steel.torrent';
const bencode = Bencode.decode(fs.readFileSync(torrentFile), 'ascii');
const torrent: Torrent = newTorrent(bencode);

console.log(torrent);

getPeers(torrent, (peers: any) => {
    console.log('list of peers: ', peers);
});