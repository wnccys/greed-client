export type TorrentInfo = {
    files: Array<any>, 
    name: string, 
    "piece-length": number,
    pieces: Buffer,   
}