import type ElectronAPI from "@electron-toolkit/preload";
import type { Downloads } from "@main/entity/Downloads";
import type { GamePath } from "@main/entity/GamePAth";

declare global {
	type GlobalDownloads = Downloads;
	type LibraryItem = GamePath;

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
		torrentId: string;
		name: string;
		size: string;
		progress: number;
		status: "paused" | "downloading";
	}

	interface Game {
		appid: number;
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
		getGamesRange: (index: number) => Promise<Game[]>;
		getSelectedGameInfo: (gameId: string) => Promise<Downloads[]>;
		removeSourceFromDB: (sourceLink: string) => Promise<string[]>;
		changeDefaultPath: () => Promise<string[]>;
		getLibraryGames: () => Promise<LibraryItem[]>;
		execGamePath: (execPath: string) => null;
		removeGamePath: (pathId: number) => null;
		getGameRegisteredPath: (
			gameName: string,
			gameSteamId: string,
			gameIcon: string,
			gameURIS: string[],
		) => Promise<string[]>;
	}

	interface Tests {
		startTorrentDownloadTest: () => null;
	}
}
