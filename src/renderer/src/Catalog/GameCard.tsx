import {
	Card,
	CardContent,
} from "@renderer/ShadComponents/ui/card";
import { Link } from "react-router-dom";

export function GameCard({ gameName, gameImage, gameId }) {
    return (
            <>
                <Link to={`../selected-game/${gameId}/${gameName}`}>
                    <Card
                        className="border shadow-lg 
                        hover:drop-shadow-2xl shadow-black rounded-md
                        max-w-[18.2vw] mt-8 cursor-pointer transition-all z-30
                        hover:-translate-y-1 hover:scale-105 duration-300 overflow-hidden bg-black"
                    >
                        <div className="hover:z-10 z-30">
                            <CardContent className="p-0 relative">
                                <img
                                    src={gameImage}
                                    alt="game-cover"
                                    className="rounded-lg"
                                />
                                <div className={`text-white absolute z-20
                                ${!(gameName.length > 25) ? 
                                    "-translate-y-[2.5rem] hover:-translate-y-[3.9rem]" :
                                     "-translate-y-[3.6rem] hover:-translate-y-[5.5rem]"} 
                                bg-zinc-950/40 transition-all duration-300 w-full`}
                                >
                                    <p className="p-2 z-10">{gameName}</p>
                                    <p className="text-xs p-3 pt-0 ps-2">{"<GameData>"}</p>
                                </div>
                            </CardContent>
                        </div>
                    </Card>
            </Link>
        </>
    );
}