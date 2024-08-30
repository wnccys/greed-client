import { parentPort } from "node:worker_threads";
import { GreedDataSource } from "./data-source";
import { SteamGames } from "./entity/SteamGames";
import type { SteamJSONGame } from "./model";

parentPort?.on("message", async (steamGamesArr: SteamJSONGame[]) => {
    GreedDataSource.initialize().then(() => {
        GreedDataSource.getRepository(SteamGames).save(steamGamesArr);
    }).then(() => parentPort?.postMessage("DONEE!!!! from worker."));
});