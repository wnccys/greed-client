import {
	ipcMain,
} from "electron";
import { handleStartTorrentDownload } from "@main/tests";
import { handleFileOpen, handleNewTorrentSource, handleStartGameDownload, handleTorrentDownloadComplete, handleUpdateTorrentInfos, handleUpdateTorrentPausedStatus, handleUpdateTorrentProgress } from "@main/events/torrent";
import { handleGetSourcesList, handleRemoveSourceFromDB } from "@main/events/sources/sources";
import { handleChangeDefaultPath, handleGetCurrentDownloadPath, handleRemoveGamePath, handleUpdateDownloadPath, handleUpdateLibrary, handleVerifyGameRegisteredPath } from "@main/events/configuration";
import { handleGetCurrentGameInfo, handleGetGamesByName, handleGetGamesRange } from "@main/events/game-information";
import { handleGetLibraryGames } from "@main/events/library";
import { handleExecGamePath, handleIsNoLongerLoading, handleOpenHydraLinks } from "@main/events/utils";
import { handleGetCurrentQueueItems, handleUpdateQueueItems } from "@main/events/queue";


/**
 * This file register all events from @main/events, separed by directory.
 */
ipcMain.handle("startTorrentDownloadTest", handleStartTorrentDownload);
ipcMain.handle("handleFileSelect", handleFileOpen);
ipcMain.handle("addSourceToDB", handleNewTorrentSource);
ipcMain.handle("getSourcesList", handleGetSourcesList);
ipcMain.handle("changeDefaultPath", handleChangeDefaultPath);
ipcMain.handle("startGameDownload", handleStartGameDownload);
ipcMain.handle("getGamesByName", handleGetGamesByName);
ipcMain.handle("getGamesRange", handleGetGamesRange);
ipcMain.handle("getLibraryGames", handleGetLibraryGames);
ipcMain.handle("openHydraLinks", handleOpenHydraLinks);
ipcMain.handle("execGamePath", handleExecGamePath);
ipcMain.handle("updateLibraryGames", handleUpdateLibrary);
ipcMain.handle("removeGamePath", handleRemoveGamePath);
ipcMain.handle("removeSourceFromDB", handleRemoveSourceFromDB);
ipcMain.handle("getSelectedGameInfo", handleGetCurrentGameInfo);
ipcMain.handle("getCurrentDownloadPath", handleGetCurrentDownloadPath);
ipcMain.handle("verifyGameRegisteredPath", handleVerifyGameRegisteredPath);
ipcMain.handle("getCurrentQueueItems", handleGetCurrentQueueItems);
ipcMain.on("updateDownloadPath", handleUpdateDownloadPath);
ipcMain.on("isNoLongerLoading", handleIsNoLongerLoading);
ipcMain.on("updateTorrentProgress", handleUpdateTorrentProgress);
ipcMain.on("updateTorrentInfos", handleUpdateTorrentInfos);
ipcMain.on("torrentDownloadComplete", handleTorrentDownloadComplete);
ipcMain.on("updateTorrentPauseStatus", handleUpdateTorrentPausedStatus);
ipcMain.on("updateQueueItems", handleUpdateQueueItems);