import type { Downloads } from "@main/model/entity/Downloads";
import { getDBGameInfos, getDBGamesByName, getGamesRange } from "@main/model/gameInfos";
import type { IpcMainInvokeEvent } from "electron";

export async function handleGetCurrentGameInfo(
	_event: IpcMainInvokeEvent,
	gameId: number,
): Promise<Downloads[]> {
	return await getDBGameInfos(gameId);
}

export async function handleGetGamesByName(_event: IpcMainInvokeEvent, name: string) {
	return await getDBGamesByName(name);
}

export async function handleGetGamesRange(_event: IpcMainInvokeEvent, index: number) {
	return await getGamesRange(index);
}