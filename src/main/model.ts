import { hostname } from "node:os";
import { GreedDataSource } from "./data-source";
import { GreedSettings } from "./entity/Settings";
import { Sources } from "./entity/Sources";
import { Downloads } from "./entity/Downloads";
import path from "node:path";
import { ipcMain } from "electron";

export function testDBConn() {
	GreedDataSource.initialize()
		.then(async (initializedGreedSource) => {
			console.log("Loading settings and sources from the database...");
			const settingsData = await GreedDataSource.manager.find(GreedSettings);
			console.log("Loaded settings: ", settingsData);
			const sourceData = await GreedDataSource.manager.find(Sources);

			console.log("Loaded Sources: ");
			for (const source of sourceData) {
				console.log("Name: ", source.name);
				console.log("Links Count: ", source.downloadsCount);
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
		})
		.catch((error) => console.log("Failed to load contents: ", error));
}

export async function addGameSource(receivedSource: string): Promise<string[]> {
	const newSource = new Sources();
	const newDownloads: Partial<Downloads>[] = [];
	const parsedSource = JSON.parse(receivedSource);

	try {
		newSource.name = JSON.stringify(parsedSource.name);
		newSource.downloadsCount = parsedSource.downloads.length;
	} catch (e) {
		return ["Error", "Could not get downloads count."];
	}

	try {
		await GreedDataSource.manager.save(newSource);
	} catch (e) {
		return ["Error", "Duplicated Sources are not allowed."];
	}

	const downloadsId = newSource.id;
	try {
		for (const downloads of parsedSource.downloads) {
			newDownloads.push({
				sourceId: downloadsId,
				title: downloads.title,
				uris: downloads.uris,
				steamId: downloads.steamId,
				uploadDate: downloads.uploadDate,
				fileSize: downloads.fileSize,
			});
		}
		await GreedDataSource.getRepository(Downloads).save(newDownloads);

		return ["Success", "Source Successfully Added."];
	} catch (e) {
		return ["Error", "Error during Downloads assignment."];
	}
}

export async function getSourcesList() {
	return await GreedDataSource.manager.find(Sources, {
		select: ["name", "downloadsCount"],
	});
}

export async function removeSourceFromDB(sourceName: string) {
	try {
		const source = GreedDataSource.getRepository(Sources);
		const downloads = GreedDataSource.getRepository(Downloads);
		const toBeDeleted = await source.findOneBy({
			name: sourceName,
		});

		if (!toBeDeleted) throw Error("Could not find requested source.");

		await downloads.delete({
			sourceId: toBeDeleted.id,
		});
		await source.remove(toBeDeleted);

		return ["Success", "Source Removed From Database."];
	} catch (e) {
		return ["Error", "Source not found in Database."];
	}
}

export async function changeDBDefaultPath(folderPath: string[]) {
	try {
		const currentPath = await GreedDataSource.getRepository(GreedSettings).findOneBy({
			id: 1
		});

		if (currentPath) {
			currentPath.downloadPath = folderPath[0];
			await GreedDataSource.manager.save(currentPath);

			ipcMain.emit("updateDownloadPath", currentPath.downloadPath);

			return ["Success", "Download Path Updated."];
		}

		return ["Error", "Default Path not Found."];

	} catch (e) {
		return ["Error", "Could not update default path."];
	}
}

export async function getDBCurrentPath () {
	return await GreedDataSource.getRepository(GreedSettings).findOneBy({
		id: 1
	}).then((record) => record?.downloadPath || "No Path");
}