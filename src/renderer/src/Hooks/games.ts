import { useState } from "react";
import gameData from "../../../steam-games/steam-games.json"

interface Game {
  id: number;
  name: string;
  clientIcon: string;
}

export function useCatalogGames(): Game[] {
    const [index] = useState<number>(0);
    const gamesData: Game[] = gameData as Game[];

    return gamesData.slice(index * 15, (index * 15) + 15);
}