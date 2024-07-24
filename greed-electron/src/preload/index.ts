import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

// contextBridge.exposeInMainWorld('electronAPI', {
//   openFile: () => ipcRenderer.invoke('dialog:openFile')
// });

// try {
//   contextBridge.exposeInMainWorld('versionsinhas', {
//     node: () => process.versions.node,
//     chrome: () => process.versions.chrome,
//   });
// } catch (e) {
//   console.error(e);
// }

// Custom APIs for renderer
const api = { openFile: () => ipcRenderer.invoke('dialog:openFile') }

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}