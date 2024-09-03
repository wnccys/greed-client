import { Input } from "@renderer/ShadComponents/ui/input";
import { SearchIcon } from "@renderer/assets/icons";
import { LibCard } from "@renderer/Library/LibCard";
import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";

export function Library() {
    const [games, setGames] = useState<Game[]>([]); // Estado para armazenar os jogos





    return (
        <div className="mt-5 flex flex-wrap justify-between gap-4">
            {games.map((game, index) => (
                <LibCard
                    key={index}
                    gameId={game.id}
                    gameName={game.name}
                    gameImage={""} 
                />
            ))}
        </div>
    );
}
