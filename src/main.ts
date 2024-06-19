import { getPeers } from '@tracker/tracker';
import * as TorrentParser from './torrentParser'
import { newTorrent } from '@customTypes/torrent'
import 'tsconfig-paths/register';

const torrentFile = './src/torrents/tears-of-steel.torrent';
// REVIEW set Torrent type as class;
const torrent = newTorrent(TorrentParser.open(torrentFile));

getPeers(torrent, (peers: any) => {
    console.log('list of peers: ', peers);
});