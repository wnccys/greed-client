import { contextBridge, ipcRenderer } from "electron";
import { electronAPI } from "@electron-toolkit/preload";

// Custom APIs for renderer
const api = {
	sendTorrentPath: (path: string) => {
		ipcRenderer.invoke("sendTorrentPath", path);
	},
	handleFileSelect: () => ipcRenderer.invoke("handleFileSelect"),
	setNewTorrentSource: (sourceLink: string) =>
		ipcRenderer.invoke("setNewTorrentSource", sourceLink),
	minimizeWindow: () => ipcRenderer.invoke("minimizeWindow"),
	maximizeWindow: () => ipcRenderer.invoke("maximizeWindow"),
	closeWindow: () => ipcRenderer.invoke("closeWindow"),
};

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
	try {
		contextBridge.exposeInMainWorld("electron", electronAPI);
		contextBridge.exposeInMainWorld("api", api);
	} catch (err) {
		console.error(err);
	}
} else {
	// @ts-ignore (define in dts)
	window.electron = electronAPI;
	// @ts-ignore (define in dts)
	window.api = api;
}
