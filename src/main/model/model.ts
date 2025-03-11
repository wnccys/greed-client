import { hostname } from "node:os";
import { GreedDataSource } from "@main/data-source";
import { GreedSettings } from "@main/model/entity/Settings";
import { Sources } from "@main/model/entity/Sources";
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

			syncSteamGames();
		})
		.catch((error) => console.log("Failed to load contents: ", error));
}

/* SECTION **/

import createWorker from "@main/workerDB?nodeWorker";
import type { SteamGames } from "@main/model/entity/SteamGames";
/**
 * Uses Hydra Launcher steam games file as anchor for all files syncronizing them each time user enters the app.
 */
async function syncSteamGames() {
	const steamGames: SteamGames[] = await ((await fetch("https://raw.githubusercontent.com/hydralauncher/hydra/refs/heads/main/seeds/steam-games.json")).json());
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

	worker.postMessage(steamGames);
}