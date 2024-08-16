// TODO set @main to /src/main
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
				console.log("name: ", source.name);
			}
		})
		.catch((error) => console.log("Failed to load contents: ", error));
}

export async function addGameSource(receivedSource: string) {
	const newSource = new Sources();
	const parsedSource = JSON.parse(receivedSource);

	newSource.name = JSON.stringify(parsedSource.name);
	newSource.downloads = JSON.stringify(parsedSource.downloads);

	try {
		await GreedDataSource.manager.save(newSource);
	} catch (e) {
		return ["Error", "Duplicated Sources are not allowed"] 
	};

    return ["Success", "Source Successfully Added."];
}