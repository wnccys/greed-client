import { Link, useLoaderData } from "react-router-dom";
import { DoubleArrowLeftIcon } from "@radix-ui/react-icons";
import { Button } from "@renderer/ShadComponents/ui/button";
import { useEffect, useState } from "react";

export function SelectedGame() {
	const gameId = useLoaderData() as number;
	const [gameImage, setGameImage] = useState<string>();
	const selectedGameInfos = window.api.getSelectedGameInfo(gameId);

	useEffect(() => {
	}, []);

	return (
		<div className="h-screen">
			<div id="game-cover">
				<div className="absolute text-lg translate-x-8 translate-y-6">
					<Link to="../catalog">
						<DoubleArrowLeftIcon className="size-5 delay-150 hover:-translate-y-1
						 transition hover:scale-105 duration-300"/>
					</Link>
				</div>
				<img src={gameImage} alt="game-cover" className="" />
			</div>

			<div id="play-menu" 
				className="flex justify-center pt-5 transition delay-150
				drop-shadow-lg shadow-black duration-300">
				<div
					className="absolute transform -translate-y-3/4 bg-[#242424] 
                        rounded-xl text-white w-[25em] flex justify-center"
				>
					<div className="p-3 w-full">
						<h1>Baldur's Gate III</h1>
						<p className="text-xs text-zinc-700 font-bold mt-[1em]">Play Time: 1540hrs</p>
					</div>
					<div className="h-full self-center p-0">
						<Button 
						className="p-6 bg-white text-zinc-900 hover:text-white w-full 
						h-full ps-10 pe-10 text-lg transition delay-150 duration-300"
						onClick={() => window.tests.startTorrentDownloadTest()}
					>
							Run
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
}
