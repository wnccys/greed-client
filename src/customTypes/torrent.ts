export type Torrent = {
   announce: string,
   announceList: Array<string>,
   comment: Array<string>,
   encoding: string,
   files: Array<any>,
   name: string,
   pieces: string,
   urlList: Array<string>
}

export function newTorrent(bencode: any): Torrent {
   return {
      announce: bencode.announce,
      announceList: bencode['announce-list'],
      comment: bencode.comment,
      encoding: bencode.encoding,
      files: bencode.info.files,
      name: bencode.name,
      pieces: bencode.pieces,
      urlList: bencode['url-list'],
   }
}

export type TrackerConnResponse = {
   action: number,
   transactionId: number,
   connectionId: Buffer,
};

export type TrackerAnnounceResponse = {
   action: number,
   transactionId: number,
   leechers: number,
   seeders: number,
   peers: Array<{ ip: string, port: number }>
}