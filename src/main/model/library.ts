import { GreedDataSource } from "@main/data-source";
import { GamePath } from "@main/model/entity/GamePath";

export async function getGameRegisteredPath(gameSteamId: number) {
	return GreedDataSource.getRepository(GamePath).findOneBy({
		steamId: gameSteamId,
	});
}

export async function addNewGameRegisteredPath(
	gameName: string,
	gameSteamId: number,
	gameIcon: string,
	gameURIS: string[],
	newPath: string,
) {
	await GreedDataSource.getRepository(GamePath).save({
		gameName: gameName,
		steamId: gameSteamId,
		icon: gameIcon,
		uris: gameURIS,
		execPath: newPath,
	});
}

export async function getDBLibraryItems() {
	const libraryItems = await GreedDataSource.manager.find(GamePath);

	return libraryItems;
}

export async function removeGameFromLibrary(id: number) {
	const deleted = await GreedDataSource.getRepository(GamePath).delete({
		id: id,
	});

	console.log("deleted: ", deleted);
}
