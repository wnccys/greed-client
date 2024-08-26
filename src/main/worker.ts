import steamGames from "../steam-games/steam-games.json";
import { parentPort } from "node:worker_threads";

interface steamGame {
	id: number;
	name: string;
	clientIcon: string;
}

const gameData = (steamGames as steamGame[]);
parentPort?.on("message", (data) => {
    const matches: string[] = [];
    console.log("work received!");

    for (const game of gameData) {
        for (const jsonGames of data) {
            // if (normalizeTitle(game.name) === normalizeTitle(jsonGames.title)) {
            if (jsonGames.include(game.name)) {
                matches.push(game.name, jsonGames.title);
            }
        }
    };

    parentPort?.postMessage(matches);
});

function normalizeTitle(title: string) {
    // Convert to lowercase
    let normalized = title.toLowerCase();

    // Remove content within parentheses and brackets
    normalized = normalized.replace(/\(.*?\)/g, '').replace(/\[.*?\]/g, '');

    // Replace dots and hyphens with spaces
    normalized = normalized.replace(/[.\-]/g, ' ');

    // Remove '+' signs and other special characters
    normalized = normalized.replace(/[+]/g, ' ');

    // Remove any remaining special characters
    normalized = normalized.replace(/[^a-z0-9\s]/g, '');

    // Replace multiple spaces with a single space and trim
    normalized = normalized.replace(/\s+/g, ' ').trim();

    return normalized;
}