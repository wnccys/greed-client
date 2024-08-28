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
	const steamInfoBaseURL = `https://store.steampowered.com/api/appdetails?appids=${gameId}`;

	interface SteamDetailsT {
		name: string;
		detailedDescription: string;
		pc_requirements: {
			minimum: string;
			recommended: string;
		};
		metacritic: {
			score: number;
			url: string;
		};
		developers: string[];
		screenshots: {
			path_thumbnail: string;
		}[];
	}

	const [steamDetails, setSteamDetails] = useState<SteamDetailsT>();
	useEffect(() => {
		fetch(steamInfoBaseURL)
			.then((response) => response.json())
			.then((steamJSON) => {
				const {
					name,
					detailed_description,
					pc_requirements,
					metacritic,
					developers,
					screenshots,
				} = steamJSON[gameId].data;

				setSteamDetails({
					name: name || "",
					detailedDescription: detailed_description || "",
					pc_requirements: {
						minimum: pc_requirements?.minimum || "",
						recommended: pc_requirements?.recommended || "",
					},
					metacritic: {
						score: metacritic?.score || 0,
						url: metacritic?.url || "",
					},
					developers: developers || [],
					screenshots:
						// biome-ignore lint/suspicious/noExplicitAny: <explanation>
						screenshots?.map((s: any) => ({
							path_thumbnail: s.path_thumbnail || null,
						})) || [],
				});
			});
	}, [gameId, steamInfoBaseURL]);

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

	console.log("steam Details: ", steamDetails);
	// const selectedGameInfos = window.api.getSelectedGameInfo(gameId);

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
						<h1>{steamDetails?.name}</h1>
						<p className="text-xs text-zinc-700 font-bold mt-[1em]">
							Play Time: 1540hrs
						</p>
					</div>
					<div>
						<Button
							className="p-6 bg-white text-zinc-900 hover:text-white w-full 
						h-full ps-10 pe-10 text-lg transition delay-150 duration-300"
							onClick={() => window.tests.startTorrentDownloadTest()}
						>
							Run
						</Button>
					</div>
				</div>
				<div className="ps-8 mt-[4rem] flex gap-12 bg-zinc-900 pb-10">
					<div className="max-w-[70%]">
						<div
							// biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
							dangerouslySetInnerHTML={{
								__html:
									steamDetails?.detailedDescription || "No Description Found.",
							}}
						/>
					</div>
					<div className="bg-zinc-800 p-5 rounded-lg me-[1.5rem] h-fit">
						<p className="text-lg font-bold">Requirements</p>
						<br />
						<div
							// biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
							dangerouslySetInnerHTML={{
								__html:
									steamDetails?.pc_requirements.minimum ||
									"No Minimum Requirements Found.",
							}}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
