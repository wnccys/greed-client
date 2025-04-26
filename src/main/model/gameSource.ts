import { GreedDataSource } from "@main/data-source";
import { Sources } from "@main/model/entity/Sources";
import { Downloads } from "@main/model/entity/Downloads";

/**
 * Register new Source to database, specially used in mergeAlgorithm
 * @returns Front-End feedback to "mergeResult" listener
 */
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
