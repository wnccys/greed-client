import { parentPort } from "node:worker_threads";
import { GreedDataSource } from "./data-source";
import { SteamGames } from "./model/entity/SteamGames";
import type { SteamJSONGame } from "./model/model";

/** 
 * This worker are responsible for asyncronously set the first-time SteamJSONGames
 * */
parentPort?.on("message", async (steamGamesArr: SteamJSONGame[]) => {
	GreedDataSource.initialize()
		.then(() => {
			GreedDataSource.getRepository(SteamGames).save(steamGamesArr);
		})
		.then(() => parentPort?.postMessage("DONEE!!!! from worker."));
});
