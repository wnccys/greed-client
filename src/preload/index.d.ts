import type ElectronAPI from '@electron-toolkit/preload'

declare global {
  interface Window {
    electron: ElectronAPI
    api: Api 
    tests: Tests
  }

  interface Api {
    sendTorrentPath: (path: string) => Promise<string | undefined>, 
    handleFileSelect: () => string,
    setNewTorrentSource: (sourceLink: string) => string,
    pauseTorrent: () => null,
    resumeTorrent: () => null,
    removeTorrent: () => null,
    addSourceToDB: (sourceLink: string) => null,
    getSelectedGameInfo: (gameId: number) => null,
    removeSourceFromDB: (sourceLink: string) => Promise<string[]>,
    changeDefaultPath: () => Promise<string[]>,
  }

  interface Tests {
    startTorrentDownloadTest: () => null,
  }
}