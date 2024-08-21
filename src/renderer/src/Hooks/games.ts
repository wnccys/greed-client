import { type Dispatch, type SetStateAction, useEffect, useState } from "react";
import gameData from "../../../steam-games/steam-games.json";

interface Game {
	id: number;
	name: string;
	clientIcon: string;
}

const gamesData: Game[] = gameData as Game[];
export function useCatalogGames(): [Dispatch<SetStateAction<number>>, Game[], string[]] {
	const [index, setIndex] = useState<number>(0);

	const selectedGames: [Dispatch<SetStateAction<number>>, Game[], string[]] = [
		setIndex,
		gamesData.slice(index * 15, index * 15 + 15),
		[],
	];

	return selectedGames;
}
