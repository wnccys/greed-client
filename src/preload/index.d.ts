import type ElectronAPI from "@electron-toolkit/preload";
import type { Downloads } from "@main/entity/Downloads";

declare global {
	type GlobalDownloads = Downloads;

	interface Window {
		electron: ElectronAPI;
		api: Api;
		tests: Tests;
	}

	interface SteamDetailsT {
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

	interface QueueItem {
		torrentId: string 
		name: string
		size: string 
		progress: number
		status: 'paused' | 'downloading'
	}

	interface Game {
		id: number;
		name: string;
	}

	interface Api {
		sendTorrentPath: (path: string) => Promise<string | undefined>;
		handleFileSelect: () => string;
		setNewTorrentSource: (sourceLink: string) => string;
		pauseTorrent: () => null;
		resumeTorrent: (magnetURI: string) => null;
		removeTorrent: (magnetURI: string) => null;
		openHydraLinks: () => null;
		addSourceToDB: (sourceLink: string) => null;
		startGameDownload: (uris: string[]) => null;
		getGamesByName: (name: string) => Promise<GlobalDownloads[]>;
		getSelectedGameInfo: (gameId: number) => Promise<Downloads[]>;
		removeSourceFromDB: (sourceLink: string) => Promise<string[]>;
		changeDefaultPath: () => Promise<string[]>;
		getGameRegisteredPath: (
			gameName: string,
			gameSteamId: number,
			gameIcon: string,
			gameURIS: string[],
		) => Promise<string[]>;
	}

	interface Tests {
		startTorrentDownloadTest: () => null;
	}
}
