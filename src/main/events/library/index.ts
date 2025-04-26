import { getDBLibraryItems } from "@main/model/library";

/**
 * Get all games from DB library
 */
export async function handleGetLibraryGames() {
	return await getDBLibraryItems();
}