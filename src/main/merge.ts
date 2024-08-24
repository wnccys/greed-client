import steamGames from "../steam-games/steam-games.json";
import { normalizeTitle } from "./model";
import { parentPort } from "node:worker_threads";

interface steamGame {
	id: number;
	name: string;
	clientIcon: string;
}

const gameData = (steamGames as steamGame[]);
parentPort?.on("message", (data) => {
    const matches: string[] = [];
    let count = 0;

    gameData.map((game) => {
        for (const jsonGames of data) {
            if (normalizeTitle(game.name) === normalizeTitle(jsonGames.title)) {
                matches.push(game.name, jsonGames.title);
                count++
                console.log("count: ", count);
            }
        }
    })

    postMessage(matches);
});