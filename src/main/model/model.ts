import { hostname } from "node:os";
import { GreedDataSource } from "@main/data-source";
import { GreedSettings } from "@main/model/entity/Settings";
import { Sources } from "@main/model/entity/Sources";
import path from "node:path";

/* Globally enable steamGames so no other piece of code need to recreate or copy it */
// export const staticSteamGames: SteamGames[] = [];

/**
 * Initialize database and seeds it with steam games.
 * 
 * Every time application in entered, it get new steam games dynamically throught syncSteamGames().
 *
 * (// TODO make it entirelly requested this way there's no need for steam-games.json //)
 * */
export async function initDatabase() {
	try {
		const initializedGreedSource = await GreedDataSource.initialize();

		/* Get and log settings */
		const settingsData = await GreedDataSource.manager.find(GreedSettings);
		console.log("Loaded settings: ", settingsData);

		/* Get and Log found sources */
		const sourceData = await GreedDataSource.manager.find(Sources);
		console.log("Loaded Sources: ");
		for (const source of sourceData) {
			console.log(
				`Name: ${source.name} Links Count: ${source.downloadsCount}`,
			);
		}

		const existingSettings = await initializedGreedSource
			.getRepository(GreedSettings)
			.exists();

		/* If settings doesn't exists, set default */
		if (!existingSettings) {
			const greedSettings = new GreedSettings();
			greedSettings.downloadPath = path.resolve("./src/downloads");
			greedSettings.username = hostname();

			await initializedGreedSource
				.getRepository(GreedSettings)
				.save(greedSettings);
		}

		await syncSteamGames();

		/* After Database is set, return steamgames to be used globally */
		// const steamGames = await GreedDataSource.getRepository(SteamGames).find();

	} catch (error) {
		console.log("Failed to load configurations: ", error)

		throw error;
	}
}

import createWorker from "@main/workerDB?nodeWorker";
import type { SteamGames } from "@main/model/entity/SteamGames";
/**
 * Uses Hydra Launcher steam games file as anchor for all files syncronizing them each time user enters the app.
 */
async function syncSteamGames() {
	const steamGames: SteamGames[] = await ((await fetch("https://raw.githubusercontent.com/hydralauncher/hydra/refs/heads/main/seeds/steam-games.json")).json());
	const worker = createWorker({});

	worker.on("message", async (result: string[]) => {
		/* Success message */
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