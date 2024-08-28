import type ElectronAPI from '@electron-toolkit/preload'
import type { Downloads } from "@main/entity/Downloads";

declare global {
  type GlobalDownloads = Downloads;

  interface Window {
    electron: ElectronAPI
    api: Api 
    tests: Tests
  }

  interface SteamDetailsT {
    name: string;
    detailedDescription: string;
    pc_requirements: {
      minimum: string;
      recommended: string;
    };
    metacritic: {
      score: number;
      url: string;
    };
    developers: string[];
    screenshots: {
      path_thumbnail: string;
    }[];
  }

  interface Api {
    sendTorrentPath: (path: string) => Promise<string | undefined>, 
    handleFileSelect: () => string,
    setNewTorrentSource: (sourceLink: string) => string,
    pauseTorrent: () => null,
    resumeTorrent: () => null,
    removeTorrent: () => null,
    addSourceToDB: (sourceLink: string) => null,
    getSelectedGameInfo: (gameId: number) => Promise<Downloads[]>,
    removeSourceFromDB: (sourceLink: string) => Promise<string[]>,
    changeDefaultPath: () => Promise<string[]>,
  }

  interface Tests {
    startTorrentDownloadTest: () => null,
  }
}