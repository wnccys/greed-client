<<<<<<< HEAD
import GameDummyImage from "@renderer/assets/image.png";

=======
>>>>>>> dbdaa252f5e9b344c8de4e341d75d3a6d0f525c3
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
                        w-[16em] mt-8 cursor-pointer transition delay-15
                        hover:-translate-y-1 hover:scale-105 duration-300 overflow-hidden"
                    >
                        <div className="">
                            <CardContent className="p-0">
                                <img
                                    src={gameImage}
                                    alt="game-cover"
                                    className="rounded-lg"
                                />
                                <p className="p-2 hover:fixed z-10 to-white">{gameName}</p>
                                <p className="text-xs text-black p-1">Description</p>
                            </CardContent>
                        </div>
                    </Card>
            </Link>
        </>
    );
}