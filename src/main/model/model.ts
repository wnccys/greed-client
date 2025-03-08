import { hostname } from "node:os";
import { GreedDataSource } from "@main/data-source";
import { GreedSettings } from "@main/model/entity/Settings";
import { Sources } from "@main/model/entity/Sources";
import { SteamGames } from "@main/model/entity/SteamGames";
import SteamJSONGames from "../../steam-games/steam-games.json";
import path from "node:path";

/**
 * Initialize database and seeds it with steam games.
 *
 * (// TODO make it entirelly requested this way there's no need for steam-games.json //)
 * */
export function initDatabase() {
	GreedDataSource.initialize()
		.then(async (initializedGreedSource) => {
			const settingsData = await GreedDataSource.manager.find(GreedSettings);
			console.log("Loaded settings: ", settingsData);
			const sourceData = await GreedDataSource.manager.find(Sources);

			console.log("Loaded Sources: ");
			for (const source of sourceData) {
				console.log(
					`Name: ${source.name} Links Count: ${source.downloadsCount}`,
				);
			}

			const greedSettings = new GreedSettings();
			const existingSettings = await initializedGreedSource
				.getRepository(GreedSettings)
				.exists();

			if (!existingSettings) {
				greedSettings.downloadPath = path.resolve("./src/downloads");
				greedSettings.username = hostname();

				await initializedGreedSource
					.getRepository(GreedSettings)
					.save(greedSettings);
			}

			// If steam-games does not exist, set it once.
			const existingSteamGames = await initializedGreedSource
				.getRepository(SteamGames)
				.exists();

			if (!existingSteamGames) {
				setSteamGames();
			}
		})
		.catch((error) => console.log("Failed to load contents: ", error));
}

import createWorker from "@main/workerDB?nodeWorker";
export type SteamJSONGame = {
	id: number;
	name: string;
};


/**
 * Set games for the first time into Database
 */
function setSteamGames() {
	const steamGamesArr: SteamJSONGame[] = SteamJSONGames as SteamJSONGame[];
	const worker = createWorker({});

	worker.on("message", async (result: string[]) => {
		console.log(result);
	});

	worker.on("error", (err) => {
		console.error("Worker  Error: ", err);
	});

	worker.on("exit", (code) => {
		console.log("Worker exited with code: ", code);
	});

	worker.postMessage(steamGamesArr);
}
