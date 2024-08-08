import GameDummyImage from "@renderer/Assets/image.png";

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@renderer/ShadComponents/ui/card";
import { Link } from "react-router-dom";

export function GameCard() {
    return (
            <>
                <Link to="../selected-game">
                    <Card
                        className="border shadow-lg 
                        hover:drop-shadow-2xl shadow-black rounded-md h-[15.5vh] 
                        lg:w-60 lg:h-36 md:w-52 md:h-24
                        w-[20vw] mt-8 cursor-pointer transition delay-15
                        hover:-translate-y-1 hover:scale-105 duration-[300]"
                    >
                        <CardContent className="p-0">
                            <img
                                src={GameDummyImage}
                                alt="game-cover"
                                className="rounded-lg"
                            />
                            <p className="p-2 fixed -translate-y-12 z-10">Baldur's Gate III</p>
                            <p className="text-xs fixed text-black">cuzao</p>
                        </CardContent>
                    </Card>
            </Link>
        </>
    );
}