import { ElectronAPI } from '@electron-toolkit/preload'

declare global {
  interface Window {
    electron: ElectronAPI
    api: api 
  }

  type ipcEvent = Promise<unknown>;

  interface api {
    sendTorrentPath: (string) => ipcEvent, 
  }
}
