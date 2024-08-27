import { Link, useLoaderData } from "react-router-dom";
import { DoubleArrowLeftIcon } from "@radix-ui/react-icons";
import { Button } from "@renderer/ShadComponents/ui/button";
import { Skeleton } from "@renderer/ShadComponents/ui/skeleton";
import { useEffect, useState } from "react";

export function SelectedGame() {
	const gameId = useLoaderData() as number;
	const [isLoading, setIsLoading] = useState(true);
	const [gameImage, setGameImage] = useState<string>();
	const [gameIcon, setGameIcon] = useState<string>();
	useEffect(() => {
		try {
			const reader = new FileReader();
			fetch(
				`https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/${gameId}/library_hero.jpg`,
			)
				.then((response) => response.blob())
				.then((blobImage) => {
					reader.onload = () => {
						setGameImage(reader.result as string);
						setIsLoading(false);
					};
					reader.readAsDataURL(blobImage);
				});
		} catch (e) {
			console.log("failed to get game image: ", e);
		}

		try {
			const reader = new FileReader();
			fetch(
				`https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/${gameId}/logo.png`,
			)
				.then((response) => response.blob())
				.then((blobImage) => {
					reader.onload = () => {
						setGameIcon(reader.result as string);
					};
					reader.readAsDataURL(blobImage);
				});
		} catch (e) {}
	}, [gameId]);

	console.log("game image: ", gameImage);

	const selectedGameInfos = window.api.getSelectedGameInfo(gameId);

	return (
		<div className="h-screen">
			<div id="game-cover">
				<div className="absolute text-lg translate-x-8 translate-y-6 mt-2">
					<Link to="../catalog">
						<DoubleArrowLeftIcon
							className="size-5 delay-150 hover:-translate-y-1
					 transition hover:scale-105 duration-300 z-20"
						/>
					</Link>
				</div>
				<div
					className={
						!gameImage?.startsWith("data:text") ? "" : "w-full h-[400px] border"
					}
				>
					{(!isLoading && <img src={gameImage} alt="game-cover" />) || (
						<Skeleton className="h-[25rem] w-full" />
					)}
				</div>
			</div>

			<div className="ms-6 absolute -translate-y-[9rem]">
				{(gameIcon && (
					<img src={gameIcon} alt="game-icon" className="h-[6rem]" />
				)) || <Skeleton className="h-[25rem]" />}
			</div>

			<div
				id="play-menu"
				className="flex justify-center transition delay-150
			drop-shadow-lg shadow-black duration-300"
			>
				<div
					className="absolute transform -translate-y-1/2 bg-[#242424] 
                        rounded-xl text-white w-[25em] flex justify-center"
				>
					<div className="p-3 w-full">
						<h1>Baldur's Gate III</h1>
						<p className="text-xs text-zinc-700 font-bold mt-[1em]">
							Play Time: 1540hrs
						</p>
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
