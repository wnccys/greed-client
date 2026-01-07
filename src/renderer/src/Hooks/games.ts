import { useQueries } from "@tanstack/react-query";
import { type Dispatch, type SetStateAction, useEffect, useMemo, useState } from "react";

/**
 * Get available games from Database index-based.
*/
export function useCatalogGames(index: number, direction: Direction, term: string): [Game[], Dispatch<SetStateAction<Game[]>>] {
	const [catalogGames, setCatalogGames] = useState<Game[]>([]);

	useEffect(() => {
		window.api.getGamesRange(index, direction, term).then((games) => {
			setCatalogGames(games);
		});
	}, [index, direction, term]);

	return [catalogGames, setCatalogGames];
}

/**
 * Extract id from games
 *
 * @param Array Database games
 * @returns Object representing image data and it's respective pending status.
 */
export function useGamesImages(games: Game[]) {
	const ids = useMemo(() => games.map((game) => game.appid), [games]);

	const results = useQueries({
		queries: ids.map((id) => ({
			queryKey: ['gameImage', id],
			queryFn: () => getImages(id),
		})),
		combine: (results) => {
			return {
				data: results.map((result) => result.data),
				pending: results.map((result) => result.isPending)
			}
		}
	});

	return results;
}

/**
 * Request image blob from steam public API.
 *
 * @returns Promise which resolves when data is correctly read as data URL
 */
async function getImages(gameId: number): Promise<string> {
	const response = await fetch(
		`https://cdn.akamai.steamstatic.com/steam/apps/${gameId}/header.jpg`,
	);

	const blobImage = await response.blob();
	const reader = new FileReader();

	return new Promise<string>((resolve) => {
		reader.onload = () => {
			resolve(reader.result as string);
		};

		reader.readAsDataURL(blobImage);
	});
}