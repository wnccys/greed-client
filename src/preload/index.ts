import { contextBridge, ipcRenderer } from "electron";
import { electronAPI } from "@electron-toolkit/preload";

/**
 * This is a basic test exposure bridge between main and renderer,
 * test objects shall be invoked here.
 */
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
	resumeTorrent: (magnetURI: string) =>
		ipcRenderer.invoke("resumeTorrent", magnetURI),
	removeTorrent: (magnetURI: string) =>
		ipcRenderer.invoke("removeTorrent", magnetURI),
	openHydraLinks: () => ipcRenderer.invoke("openHydraLinks"),
	startGameDownload: (uris: string[]) =>
		ipcRenderer.invoke("startGameDownload", uris),
	getGamesByName: (name: string) => ipcRenderer.invoke("getGamesByName", name),
	getGamesRange: (index: number) => ipcRenderer.invoke("getGamesRange", index),
	addSourceToDB: (sourceLink: string) =>
		ipcRenderer.invoke("addSourceToDB", sourceLink),
	getSelectedGameInfo: (gameId: number) =>
		ipcRenderer.invoke("getSelectedGameInfo", gameId),
	removeSourceFromDB: (sourceName: string) =>
		ipcRenderer.invoke("removeSourceFromDB", sourceName),
	changeDefaultPath: () => ipcRenderer.invoke("changeDefaultPath"),
	getLibraryGames: () => ipcRenderer.invoke("getLibraryGames"),
	execGamePath: (execPath: string) =>
		ipcRenderer.invoke("execGamePath", execPath),
	removeGamePath: (pathId: number) =>
		ipcRenderer.invoke("removeGamePath", pathId),
	getGameRegisteredPath: (
		gameName: string,
		steamGameId: number,
		gameIcon: string,
		gameURIS: string[],
	) =>
		ipcRenderer.invoke(
			"verifyGameRegisteredPath",
			gameName,
			steamGameId,
			gameIcon,
			gameURIS,
		),
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
