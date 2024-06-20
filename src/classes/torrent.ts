import { TorrentInfo } from "@customTypes/torrentInfo";

export class Torrent {
   announce: string;
   announceList: Array<string>;
   comment: Array<string>;
   encoding: string;
   info: TorrentInfo;

   constructor(bencode: any) {
      this.announce = bencode.announce;
      this.announceList = bencode['announce-list'];
      this.comment = bencode.comment;
      this.encoding = bencode.encoding;
      this.info = {
         files: bencode.info.files,
         name: bencode.info.name,
         "piece-length": bencode.info['piece-length'],
         pieces: bencode.info.pieces,
      };
   }
}