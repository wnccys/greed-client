import { Link, useParams } from "react-router-dom";
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
import { Card } from "@renderer/ShadComponents/ui/card";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@renderer/ShadComponents/ui/carousel";
import { useQuery } from "@tanstack/react-query";
import { ScrollArea } from "@renderer/ShadComponents/ui/scroll-area";
import {
	getGameIcon,
	getGameImage,
	getGameInfo,
} from "@renderer/SelectedGame/requests";

export function SelectedGame() {
	// TODO None causes the API fetch to fail (handle this)
	const [gameId, gameName] = [
		useParams().gameId || "None",
		useParams().gameName || "None",
	];

	const [gameInfos, setGamesInfo] = useState<GlobalDownloads[]>([]);

	const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
	const [selectedDownload, setSelectedDownload] = useState<string[]>([]);

	const { data: steamDetails, isLoading } = useQuery({
		queryKey: ["gameInfoQuery", gameName],
		queryFn: () => getGameInfo(gameId),
		refetchOnWindowFocus: false,
	});

	const { data: gameImage } = useQuery({
		queryKey: ["gameImageQuery", gameName],
		queryFn: () => getGameImage(gameId),
		refetchOnWindowFocus: false,
	});

	const { data: gameIcon } = useQuery({
		queryKey: ["gameIconQuery", gameName],
		queryFn: () => getGameIcon(gameId),
		refetchOnWindowFocus: false,
	});

	useEffect(() => {
		window.api.getSelectedGameInfo(gameId).then((games: GlobalDownloads[]) => {
			setGamesInfo(games);
		});
	}, [gameId]);

	if (!gameId) return <div>Error: Cannot find game with id: {gameId}</div>;

	return (
		<div className="h-screen mt-9">
			<div id="game-cover">
				<div className="fixed text-lg translate-x-8 translate-y-6 mt-2 z-40">
					<Link to="../catalog" className="absolute">
						<DoubleArrowLeftIcon
							className="size-6 delay-150 hover:-translate-y-1
							transition hover:scale-105 duration-300 z-50"
						/>
					</Link>
				</div>
				<div
					className={
						!gameImage?.startsWith("data:text") ? "" : "w-full h-[350px] border"
					}
				>
					{!isLoading ? (
						<div
							className="bg-fixed h-[350px]"
							style={{
								backgroundImage: `url(${gameImage})`,
								backgroundSize: "100%",
								minHeight: "43vh",
							}}
						/>
					) : (
						<Skeleton className="h-[20rem] w-full bg-zinc-800" />
					)}
				</div>
			</div>

			<div className="ms-6 -translate-y-[12rem]">
				{gameIcon ? (
					<img
						src={gameIcon}
						alt="game-icon"
						className="max-h-[8rem] shadow-[#242424] p-2"
					/>
				) : (
					<Skeleton className="h-[5rem] w-[20rem] bg-zinc-950 rounded-xl" />
				)}
			</div>

			<div id="play-menu" className="flex justify-center">
				<div
					className="-translate-y-[11.5rem] translate-x-[5rem] bg-[#1f1f1f] rounded-xl text-white 
					w-[25em] max-h-[6rem] flex justify-center shadow-md shadow-black p-0 m-0"
				>
					<div className="flex w-full">
						<div className="p-3 w-full">
							<h1>{gameName}</h1>
							<p className="text-xs text-zinc-700 font-bold mt-2">
								Play Time: 1540hrs
							</p>
						</div>
						<div>
							<Button
								className="p-6 bg-white text-zinc-900 hover:text-white w-full 
								h-full ps-10 pe-10 text-lg hover:bg-black/50"
								onClick={() =>
									verifyGamePath(gameName, gameId, gameIcon || "", gameInfos)
								}
							>
								Play
							</Button>
						</div>
					</div>
				</div>
				<Dialog open={isDialogOpen}>
					<DialogTrigger asChild>
						<Button
							className="-translate-y-[9.7rem] translate-x-[10rem] bg-[#1f1f1f] rounded-md
							text-white hover:bg-zinc-800 cursor-pointer p-6 flex items-center"
							onClick={() => setIsDialogOpen(true)}
						>
							<DownloadIcon className="size-6 me-2" />
							<p className="text-sm">Download Options</p>
						</Button>
					</DialogTrigger>
					<DialogContent className="sm:max-w-[525px] bg-zinc-950 max-h-screen">
						{(gameInfos?.length > 0 && (
							<>
								<DialogHeader>
									<DialogTitle>Available Downloads</DialogTitle>
									<DialogDescription>
										Showing available Downloads for {gameName}
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
								<div className="h-full">
									<div className="flex flex-col text-sm h-full">
										{gameInfos.map((downloadOption) => {
											return (
												// biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
												<div
													key={downloadOption.uris[0]}
													className={`p-3 cursor-pointer hover:bg-white hover:text-black
													transition-all duration-300
													${downloadOption.uris === selectedDownload && "bg-white text-black"}`}
													onClick={() => {
														setSelectedDownload(downloadOption.uris);
													}}
												>
													{downloadOption.title}
													{" - "}
													{downloadOption.fileSize}
												</div>
											);
										})}
									</div>
								</div>

								<DialogFooter>
									<Button
										type="submit"
										// onClick={addSourceToDB}
										className="hover:bg-zinc-800"
										onClick={() => {
											setIsDialogOpen(false);
											startGameDownload(gameInfos);
										}}
									>
										Download
									</Button>
								</DialogFooter>
							</>
						)) || (
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
			</div>

			<div>
				<div className="ps-8 flex gap-12 bg-[#171717]">
					{(!isLoading && (
						<div className="flex flex-col items-center">
							<Carousel className="max-w-md pb-10">
								<CarouselContent>
									{steamDetails.screenshots.map((thumbnail, index) => (
										// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
										<CarouselItem key={index}>
											<div className="p-1">
												<Card>
													<img
														src={thumbnail.path_thumbnail}
														alt="game_screenshots"
														className="rounded-lg border-white border w-fit"
													/>
												</Card>
											</div>
										</CarouselItem>
									))}
								</CarouselContent>
								<CarouselPrevious className="bg-zinc-950 hover:bg-zinc-900 transition-all duration-200 scale-125" />
								<CarouselNext className="bg-zinc-950 hover:bg-zinc-900 transition-all duration-200 scale-125" />
							</Carousel>
							<div
								className="text-center flex flex-col items-center gap-5 max-w-[50rem] mb-32"
								// biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
								dangerouslySetInnerHTML={{
									__html:
										steamDetails.detailed_description ||
										"No Description Found.",
								}}
							/>
						</div>
					)) || (
						<div className="flex flex-col space-y-3">
							<Skeleton className="h-[300px] w-[600px] rounded-xl bg-zinc-800" />
							<div className="space-y-2">
								<Skeleton className="h-4 w-[250px]" />
								<Skeleton className="h-4 w-[200px]" />
								<Skeleton className="h-4 w-[400px]" />
								<Skeleton className="h-4 w-[400px]" />
							</div>
						</div>
					)}

					{!isLoading ? (
						<div
							className="bg-[#1f1f1f] p-5 rounded-lg me-[1.5rem] h-fit shadow-black shadow-md 
							hover:shadow-lg hover:shadow-black transition-all duration-200 text-sm w-[30rem] mt-10"
						>
							<p className="text-lg font-bold">Requirements</p>
							<br />
							<div
								className="flex flex-col"
								// TODO set correct layout when description is not available
								// biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
								dangerouslySetInnerHTML={{
									__html:
										steamDetails?.pc_requirements.minimum ||
										"No Minimum Requirements Found.",
								}}
							/>
						</div>
					) : (
						<div className="ms-[13vw] gap-8 flex flex-col space-y-3 pe-10">
							<Skeleton className="h-[18rem] w-[18rem] rounded-xl bg-zinc-800" />
							<div className="space-y-2">
								<Skeleton className="h-4 w-[250px]" />
								<Skeleton className="h-4 w-[200px]" />
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}

function startGameDownload(selectedDownload: string[]) {
	window.api.startGameDownload(selectedDownload);
}

function verifyGamePath(
	gameName: string,
	gameId: string,
	gameIcon: string,
	gameInfos: GlobalDownloads[],
) {
	window.api
		.getGameRegisteredPath(
			gameName,
			gameId,
			gameIcon,
			gameInfos.map((downloadOption) => {
				return downloadOption.uris;
			}),
		)
		.then((result) => {
			if (result[0] === "Success") {
				console.log(result[1]);
				return;
			}
		});
}
