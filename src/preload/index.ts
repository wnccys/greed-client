import { contextBridge, ipcRenderer } from "electron";
import { electronAPI } from "@electron-toolkit/preload";

const tests = {
	startTorrentDownloadTest: () => ipcRenderer.invoke("startTorrentDownloadTest"),
}

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
	unmaximizeWindow: () => ipcRenderer.invoke("unmaximizeWindow"),
	closeWindow: () => ipcRenderer.invoke("closeWindow"),
	isMaximized: () => ipcRenderer.invoke("checkWindowIsMaximized"),
	pauseTorrent: () => ipcRenderer.invoke("pauseTorrent"),
	resumeTorrent: () => ipcRenderer.invoke("resumeTorrent"),
};

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
	try {
		contextBridge.exposeInMainWorld("electron", electronAPI);
		contextBridge.exposeInMainWorld("api", api);
		contextBridge.exposeInMainWorld("tests", tests);
	} catch (err) {
		console.error(err);
	}
} else {
	// @ts-ignore (define in dts)
	window.electron = electronAPI;
	// @ts-ignore (define in dts)
	window.api = api;
	// @ts-ignore (define in dts)
	window.tests = tests;
}