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
    minimizeWindow: () => null,
    maximizeWindow: () => null,
    unmaximizeWindow: () => null,
    closeWindow: () => null,
    isMaximized: () => boolean,
    pauseTorrent: () => null,
    resumeTorrent: () => null,
    addSourceToDB: (sourceLink: string) => null,
    removeSourceFromDB: (sourceLink: string) => null,
  }

  interface Tests {
    startTorrentDownloadTest: () => null,
  }
}