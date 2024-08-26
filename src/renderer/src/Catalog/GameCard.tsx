import GameDummyImage from "@renderer/assets/image.png";

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@renderer/ShadComponents/ui/card";
import { Link } from "react-router-dom";

export function GameCard({ gameName, gameImage }) {
    console.log("received name: ", gameName);
    console.log("source: ", gameImage)

    return (
            <>
                <Link to="../selected-game">
                    <Card
                        className="border shadow-lg 
                        hover:drop-shadow-2xl shadow-black rounded-md h-[15.5vh] 
                        lg:w-60 lg:h-36 md:w-52 md:h-24
                        w-[20vw] mt-8 cursor-pointer transition delay-15
                        hover:-translate-y-1 hover:scale-105 duration-300 overflow-hidden"
                    >
                        <div className="">
                            <CardContent className="p-0">
                                <img
                                    src={gameImage}
                                    alt="game-cover"
                                    className="rounded-lg"
                                />
                                <p className="p-2 hover:fixed z-10 text-black">{gameName}</p>
                                <p className="text-xs text-black p-1">Description</p>
                            </CardContent>
                        </div>
                    </Card>
            </Link>
        </>
    );
}