import { Card, CardContent } from "@renderer/ShadComponents/ui/card";
import { Link } from "react-router-dom";

export function GameCard({ gameName, gameImage, gameId }) {
	return (
		<Link to={`../selected-game/${gameId}/${gameName}`} className="mt-8 w-fit">
			<Card
				className="border shadow-lg hover:drop-shadow-2xl shadow-black rounded-none max-w-[17.5vw]
				cursor-pointer transition-all hover:-translate-y-1 hover:scale-105 duration-150 h-fit bg-black
				relative overflow-hidden"
			>
				<CardContent className="p-0">
					<img src={gameImage} alt="game-cover" className="rounded-none z-10" />
					<div
						className={`text-white absolute -translate-y-[62%] hover:-translate-y-[100%]
                        bg-zinc-950/40 transition-all duration-100 w-full z-20`}
					>
						<p className="p-2">{gameName}</p>
						<p className="text-xs p-3 pt-0 ps-2">{"<GameData>"}</p>
					</div>
				</CardContent>
			</Card>
		</Link>
	);
}
