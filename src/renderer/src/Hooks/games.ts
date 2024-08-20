import { useState } from "react";
import Games from "../../../steam-games/steam-games.json"

interface Game {
    id: number,
    name: string,
}

export function useCatalogGames() {
    const [index, setIndex] = useState<number>(1)
    const selectedGames = Games as Game[];

    for (const game in selectedGames) {
        console.log("game title: ", game);
    }
}