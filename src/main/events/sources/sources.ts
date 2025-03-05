import { getSourcesList, removeSourceFromDB } from "@main/model/gameSource";
import type { IpcMainInvokeEvent } from "electron";

// ---- Sources ----
export async function handleGetSourcesList() {
	const sourcesList = await getSourcesList();

	return sourcesList;
}

export async function handleRemoveSourceFromDB(
	_event: IpcMainInvokeEvent,
	sourceName: string,
) {
	const result = removeSourceFromDB(sourceName);

	return result;
}