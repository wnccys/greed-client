export class Torrent {
   announce: string;
   announceList: Array<string>;
   comment: Array<string>;
   encoding: string;
   info: Object;

   constructor(bencode: any) {
        this.announce = bencode.announce;
        this.announceList = bencode['announce-list'];
        this.comment = bencode.comment;
        this.encoding = bencode.encoding;
        this.info = bencode.info;
   }
}