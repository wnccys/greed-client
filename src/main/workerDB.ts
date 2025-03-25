import { parentPort } from "node:worker_threads";
import { GreedDataSource } from "./data-source";
import { SteamGames } from "./model/entity/SteamGames";

/** 
 * This worker are responsible for asyncronously set the first-time SteamJSONGames
 * */
parentPort?.on("message", async (steamGamesArr: SteamGames[]) => {
	GreedDataSource.initialize()
		.then(() => {
			GreedDataSource.getRepository(SteamGames).save(steamGamesArr);
		})
		.then(() => parentPort?.postMessage("DONEE!!!! from worker."));
});
