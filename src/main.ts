import { getPeers } from '@tracker/tracker';
import { Torrent } from '@classes/torrent';
import * as TorrentParser from './torrentParser'
import 'tsconfig-paths/register';

const torrentFile = './src/torrents/tears-of-steel.torrent';
// REVIEW check if torrent obj needs a prefixed size in bytes;
const torrent = new Torrent(TorrentParser.open(torrentFile));

getPeers(torrent, (peers: any) => {
    console.log('list of peers: ', peers);
});