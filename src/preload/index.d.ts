import type ElectronAPI from '@electron-toolkit/preload'

declare global {
  interface Window {
    electron: ElectronAPI
    api: Api 
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
  }
}