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