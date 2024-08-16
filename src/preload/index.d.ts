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
    addSourceToDB: (sourceLink: string) => Promise<string[]>,
    removeSourceFromDB: (sourceLink: string) => null,
  }

  interface Tests {
    startTorrentDownloadTest: () => null,
  }
}