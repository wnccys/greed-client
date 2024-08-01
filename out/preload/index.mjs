import { contextBridge, ipcRenderer } from "electron";
import { electronAPI } from "@electron-toolkit/preload";
const api = {
  sendTorrentPath: (path) => {
    ipcRenderer.invoke("sendTorrentPath", path);
  },
  handleFileSelect: () => ipcRenderer.invoke("handleFileSelect")
};
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld("electron", electronAPI);
    contextBridge.exposeInMainWorld("api", api);
  } catch (err) {
    console.error(err);
  }
} else {
  window.electron = electronAPI;
  window.api = api;
}
