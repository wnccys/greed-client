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
                        hover:drop-shadow-2xl shadow-black rounded-md h-[10em] 
                        w-[18em] mt-8 cursor-pointer overflow-hidden transition delay-15
                        hover:-translate-y- hover:scale-105 duration-[300]"
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