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
		.catch((error) => console.log(error));
}

export async function addGameSource(receivedSource: string) {
	const newSource = new Sources();
	const parsedSource = JSON.parse(receivedSource);

	try {
		newSource.name = JSON.stringify(parsedSource.name);
		newSource.downloads = JSON.stringify(parsedSource.downloads);
	} catch (e) {
        return ["Error", "Invalid Data Received."];
	}

	console.log("Parsed Source Name: ", parsedSource.name);
	const isDuplicated = await GreedDataSource.getRepository(Sources).findOneBy({
		name: parsedSource.name
	});
	if (isDuplicated != null) return ["Error", "Cannot Add Duplicated Source."]

	await GreedDataSource.manager.save(newSource);
    return ["Success", "Source Successfully Added."];
}