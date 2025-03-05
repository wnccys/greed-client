import { getDBLibraryItems } from "@main/model/library";

export async function handleGetLibraryGames() {
	return await getDBLibraryItems();
}