import GameDummyImage from "@renderer/assets/image.png";

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@renderer/components/ui/card";
import { Link } from "react-router-dom";

export function GameCards() {
    return (
        <>
            {Array.from({ length: 6 }).map((_, index) => {
                return (
                    // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                    <Link to="../selected-game" key={index}>
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
                )
            })}
        </>
    );
}