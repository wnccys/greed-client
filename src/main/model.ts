import { GreedDataSource } from "./data-source";
import { GreedSettings } from "./entity/Settings";
import { Sources } from "./entity/Sources";

export function testDBConn() {
	GreedDataSource.initialize()
		.then(async () => {
			console.log("Loading settings and sources from the database...");
			const settingsData = await GreedDataSource.manager.find(GreedSettings);
			console.log("Loaded settings: ", settingsData);
			const sourceData = await GreedDataSource.manager.find(Sources);

			console.log("Loaded Sources: ");
			for (const source of sourceData) {
				console.log("Name: ", source.name);
				console.log("Links Count: ", source.downloadsCount);
			}
		})
		.catch((error) => console.log("Failed to load contents: ", error));
}

export async function addGameSource(receivedSource: string) {
	const newSource = new Sources();
	const parsedSource = JSON.parse(receivedSource);

	try {
		newSource.name = JSON.stringify(parsedSource.name);
		newSource.downloads = JSON.stringify(parsedSource.downloads);
		newSource.downloadsCount = parsedSource.downloads.length;
	} catch (e) {
		return ["Error", "Could not get downloads count"];
	}

	try {
		await GreedDataSource.manager.save(newSource);
		return ["Success", "Source Successfully Added."];
	} catch (e) {
		return ["Error", "Duplicated Sources are not allowed"];
	}
}

export async function getSourcesList() {
	return await GreedDataSource.manager.find(Sources, {
		select: ['name', 'downloadsCount']
	});
}

export async function removeSourceFromDB() {

}
