import type ElectronAPI from '@electron-toolkit/preload'

declare global {
  interface Window {
    electron: ElectronAPI
    api: Api 
  }

  type ipcEvent = Promise<string | undefined>;

  interface Api {
    sendTorrentPath: (string) => ipcEvent, 
    handleFileSelect: () => string,
  }
}