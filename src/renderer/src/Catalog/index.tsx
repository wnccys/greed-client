import { Input } from "@renderer/ShadComponents/ui/input";
import { SearchIcon } from "@renderer/Assets/icons";
import { CustomCarousel } from "./CustomCarousel";
import { GameCard } from "./GameCard";
import { useCatalogGames, useGamesImages } from "@renderer/Hooks/games";
import { Button } from "@renderer/ShadComponents/ui/button";
import { useEffect, useState } from "react";
import { Skeleton } from "@renderer/ShadComponents/ui/skeleton";

export function Catalog() {
	const games = useCatalogGames();
	const [isImagesLoading, setIsImageLoading] = useState<boolean>(true);
	const images = useGamesImages(games[1], setIsImageLoading);
	const [isSearching, setIsSearching] = useState<boolean>(false);
	const [searchImages, setSearchImages] = useState<string[]>([]);
	const [search, setSearch] = useState<string>("");
	const [searchGames, setSearchGames] = useState<GlobalDownloads[]>([]);

	useEffect(() => {
		 window.api.getGamesByName(search).then((games) => {
			setSearchGames(games);
		 })

		//  const timer = setTimeout(() => {
		// 	const cu = useGamesImages(searchGames, setIsImageLoading)
		// 	setSearchImages(cu);
		//  }, 400);

		//  return () => {
		// 	clearTimeout(timer);
		//  }
	}, [search])

	useEffect(() => {
		console.log("search images: ", searchImages);
	}, [searchImages])

	return (
		<div className="bg-[#171717]">
			<div className="flex gap-2 justify-between mt-10 me-10">
				<div className="ms-10 flex self-center">
					<h1 className="text-2xl font-bold">Catalog</h1>
				</div>{" "}
				<div
					className="rounded-md bg-zinc-800 flex p-2 ps-4 
				items-center hover:shadow-xl"
					onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
						setIsSearching(e.target.value !== (undefined || ""));
						setSearch(e.target.value) 
						console.log(e.target.value);
					}}
				>
					<img src={SearchIcon} alt="search-icon" className="size-4" />
					<Input
						className="max-w-[12vw] max-h-8 border-none focus-visible:ring-0 focus:max-w-[14vw] 
					focus-visible:ring-offset-0 transition-all focus-visible:duration-300
					focus-visible:border-none"
						type="text"
						placeholder="Search Games"
					/>
				</div>
			</div>

			<div className="ms-8 mt-[2rem] me-10 bg-[#171717] mb-10">
				{(!isSearching && (
					<>
						<div
							className="shadow-lg hover:drop-shadow-2xl
                transition-colors shadow-black rounded-lg"
						>
							{games[1][14].id <= 340 ? <CustomCarousel /> : null}
						</div>
						{
						!isImagesLoading && (<>
						<div
							id="games-section"
							className="mt-5 flex flex-wrap justify-between gap-4"
						>
							{games[1].map((_, key) => {
									return ((
										<GameCard
											// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
											key={key}
											gameId={games[1][key].id}
											gameName={games[1][key].name}
											gameImage={images[key]}
										/>
									))
							})}
						</div>
						<div className="fixed right-1/2 left-3/4 z-20 top-full -translate-y-14 translate-x-48">
							<Button
								onClick={() => {
									games[0]((currentValue) => currentValue + 1) 
									setIsImageLoading(true);
								}}
								className="bg-zinc-900/50 duration-300 transition-all hover:bg-zinc-900"
							>
								Next Page
							</Button>
						</div>
						<div className="fixed right-1/2 left-1/4 z-20 top-full -translate-y-14 -translate-x-12 w-fit rounded">
							<Button
								onClick={() => games[0]((currentValue) => currentValue - 1)}
								{...(games[1][0].id < 30 && { disabled: true })}
								className="bg-zinc-900/50 duration-300 transition-all hover:bg-zinc-900"
							>
								Previous Page
							</Button>
						</div>
						</>) || (
							<div className="mt-5 flex flex-wrap justify-between gap-4">
								{games[1].map((_, index) => {
									return (
										// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
										<Skeleton className="w-[16rem] p-2 h-40 shadow-lg shadow-black" key={index}/>
									)	
								})}
							</div>	
						)}
					</>
				)) ||
					"Searching..." && (
					<div>
						{searchGames?.slice(0,20).map((game, index) => {
							return (
							// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
							<div key={index}>
								{game.id}{" "}
								{game.name}
								{searchImages[index] || " no image."}
							</div>)
						})}
					</div>
					)}
			</div>
		</div>
	);
}
