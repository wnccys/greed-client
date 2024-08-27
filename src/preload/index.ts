import { contextBridge, ipcRenderer } from "electron";
import { electronAPI } from "@electron-toolkit/preload";

const tests = {
	startTorrentDownloadTest: () =>
		ipcRenderer.invoke("startTorrentDownloadTest"),
};

// Custom APIs for renderer
const api = {
	sendTorrentPath: (path: string) => {
		ipcRenderer.invoke("sendTorrentPath", path);
	},
	handleFileSelect: () => ipcRenderer.invoke("handleFileSelect"),
	setNewTorrentSource: (sourceLink: string) =>
		ipcRenderer.invoke("setNewTorrentSource", sourceLink),
	pauseTorrent: () => ipcRenderer.invoke("pauseTorrent"),
	resumeTorrent: () => ipcRenderer.invoke("resumeTorrent"),
	removeTorrent: () => ipcRenderer.invoke("removeTorrent"),
	addSourceToDB: (sourceLink: string) =>
		ipcRenderer.invoke("addSourceToDB", sourceLink),
	getSelectedGameInfo: (gameId: number) => ipcRenderer.invoke("getSelectedGameInfo", gameId),
	removeSourceFromDB: (sourceName: string) =>
		ipcRenderer.invoke("removeSourceFromDB", sourceName),
	changeDefaultPath: () => ipcRenderer.invoke("changeDefaultPath"),
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
