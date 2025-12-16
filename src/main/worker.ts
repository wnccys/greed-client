import { parentPort } from "node:worker_threads";
import type { SteamGames } from "./model/entity/SteamGames";

export interface JSONGame {
	title: string;
	uris: string[];
	steamId: number | null;
	uploadDate: string;
	fileSize: string;
}

/**
 * This is the Greed merge-algorithm itself, it checks iterates over steamGames
 * checking if it has name, if true it checks if the jsonGames titles starts or includes the steam game, 
 * returning the final mapped array
 */
parentPort?.on("message", async (data: [JSONGame[], SteamGames[]]) => {
    const incomingGames = data[0];
    const steamGames = data[1];

	for (const game of steamGames) {
		// biome-ignore lint/style/useConst: <explanation>
		for (let jsonGames of incomingGames) {
			if (
				game.name &&
				jsonGames.title.startsWith(game.name) &&
				jsonGames.title.includes(game.name)
			) {
				jsonGames.steamId = game.appid;
			}
		}
	}

	parentPort?.postMessage(incomingGames);
});

// function normalizeTitle(title: string) {
//     // Convert to lowercase
//     let normalized = title.toLowerCase();

//     // Remove content within parentheses and brackets
//     normalized = normalized.replace(/\(.*?\)/g, '').replace(/\[.*?\]/g, '');

//     // Replace dots and hyphens with spaces
//     normalized = normalized.replace(/[.\-]/g, ' ');

//     // Remove '+' signs and other special characters
//     normalized = normalized.replace(/[+]/g, ' ');

//     // Remove any remaining special characters
//     normalized = normalized.replace(/[^a-z0-9\s]/g, '');

//     // Replace multiple spaces with a single space and trim
//     normalized = normalized.replace(/\s+/g, ' ').trim();

//     return normalized;
// }
