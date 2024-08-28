import { Link, useLoaderData } from "react-router-dom";
import { Cross2Icon, DoubleArrowLeftIcon } from "@radix-ui/react-icons";
import { Button } from "@renderer/ShadComponents/ui/button";
import { Skeleton } from "@renderer/ShadComponents/ui/skeleton";
import { useEffect, useState } from "react";
import { DownloadIcon } from "@radix-ui/react-icons";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogFooter,
	DialogTitle,
	DialogTrigger,
} from "@renderer/ShadComponents/ui/dialog";
import { Label } from "@renderer/ShadComponents/ui/label";

export function SelectedGame() {
	const [gameId, gameName] = useLoaderData() as [number, string];
	const [isLoading, setIsLoading] = useState(true);
	const [gameImage, setGameImage] = useState<string>();
	const [gameIcon, setGameIcon] = useState<string>();
	const steamInfoBaseURL = `https://store.steampowered.com/api/appdetails?appids=${gameId}`;
	const [gameInfos, setGamesInfos] = useState<GlobalDownloads[]>([]);
	const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

	const [steamDetails, setSteamDetails] = useState<SteamDetailsT>();
	useEffect(() => {
		fetch(steamInfoBaseURL)
			.then((response) => response.json())
			.then((steamJSON) => {
				const {
					detailed_description,
					pc_requirements,
					metacritic,
					developers,
					screenshots,
				} = steamJSON[gameId].data;

				setSteamDetails({
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

	useEffect(() => {
		window.api.getSelectedGameInfo(gameId)
			.then((games: GlobalDownloads[]) => {
			setGamesInfos(games);
		});
	}, [gameId]);

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
				className="flex justify-center transition delay-150 duration-300"
			>
				<div
					className="absolute transform -translate-y-1/2 bg-[#171717] 
					rounded-xl text-white w-[25em] flex justify-center shadow-md shadow-black"
				>
					<div className="p-3 w-full">
						<h1>{gameName}</h1>
						<p className="text-xs text-zinc-700 font-bold mt-[1em]">
							Play Time: 1540hrs
						</p>
					</div>
					<div>
						<Button
							className="p-6 bg-white text-zinc-900 hover:text-white w-full 
							h-full ps-10 pe-10 text-lg transition delay-75 duration-300 hover:bg-zinc-950"
							onClick={() => window.tests.startTorrentDownloadTest()}
						>
							Play
						</Button>
					</div>
				</div>
				<Dialog open={isDialogOpen}>
					<DialogTrigger asChild>
					<Button
						className="absolute -translate-y-1/2 translate-x-[22.5rem] bg-[#171717] w-fit rounded-md
						 shadow-black shadow-md text-white cursor-pointer p-6 hover:bg-[#1f1f1f] transition-all 
						 duration-200 flex items-center"
						onClick={() => setIsDialogOpen(true)}
					>
						<DownloadIcon className="size-6 me-2" />
						<p className="text-sm">Download Options</p>
					</Button>
					</DialogTrigger>
					<DialogContent className="sm:max-w-[525px] bg-zinc-950">
						{(gameInfos?.length > 0 && <>
						<DialogHeader>
							<DialogTitle>
								Available Downloads
							</DialogTitle>
							<DialogDescription>
								Showing available Sources for {gameName}
							</DialogDescription>
							<div
								className="absolute right-4 top-2 rounded-sm opacity-70 
								ring-offset-background hover:bg-zinc-800 
								hover:-translate-y-[2px] hover:duration-300 
								transition-all hover:opacity-100 focus:outline-none focus:ring-2 
								focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none 
								data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
							>
								<Cross2Icon
									className="size-4 cursor-pointer"
									onClick={() => setIsDialogOpen(false)}
								/>
							</div>
						</DialogHeader>
						<div className="grid gap-4 py-4">
							<div className="grid grid-cols-4 items-center gap-4">
								<Label htmlFor="username" className="text-right">
									Source Link
								</Label>
							</div>
						</div>

						<DialogFooter>
							<Button
								type="submit"
								// onClick={addSourceToDB}
								className="hover:bg-zinc-800 hover:-translate-y-1
								hover:duration-500 transition-all"
							>
								Download	
							</Button>
						</DialogFooter>
						</>) || 
						(
						<>
							<DialogHeader>
								<div
									className="absolute right-4 top-2 rounded-sm opacity-70 
									ring-offset-background hover:bg-zinc-800 p-1
									hover:-translate-y-[2px] hover:duration-300 
									transition-all hover:opacity-100 focus:outline-none focus:ring-2 
									focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none 
									data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
								>
									<Cross2Icon
										className="size-4 cursor-pointer"
										onClick={() => setIsDialogOpen(false)}
									/>
								</div>
							</DialogHeader>
							<div className="w-full">
								<Label htmlFor="username" className="text-right">
									<strong>{`No Downloads available for ${gameName}`}</strong>
								</Label>
							</div>
						</>
						)}
					</DialogContent>
				</Dialog>

				<div className="ps-8 mt-[4rem] flex gap-12 bg-[#171717] pb-10">
					<div className="max-w-[65%]">
						<div
							// biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
							dangerouslySetInnerHTML={{
								__html:
									steamDetails?.detailedDescription || "No Description Found.",
							}}
						/>
					</div>
					<div className="bg-[#1f1f1f] p-5 rounded-lg me-[1.5rem] h-fit shadow-black shadow-md 
						hover:shadow-lg hover:shadow-black transition-all duration-200"
					>
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
