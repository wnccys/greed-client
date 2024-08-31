import { Input } from "@renderer/ShadComponents/ui/input";
import { SearchIcon } from "@renderer/assets/icons";
import { CustomCarousel } from "./CustomCarousel";
import { GameCard } from "./GameCard";
import { useCatalogGames, useGamesImages } from "@renderer/Hooks/games";
import { Button } from "@renderer/ShadComponents/ui/button";
import { useEffect, useState } from "react";
import { Skeleton } from "@renderer/ShadComponents/ui/skeleton";
<<<<<<< HEAD

=======
import { useSearchImages } from "@renderer/Hooks/search";
>>>>>>> 63da1ba56bb8d6b86d8d267ef7ae96a1d7e86a87

export function Catalog() {
	const games = useCatalogGames();
	const [isImagesLoading, setIsImageLoading] = useState<boolean>(true);
	const images = useGamesImages(games[1], setIsImageLoading);
	const [isSearching, setIsSearching] = useState<boolean>(false);
	const [searchImages, setSearchImages] = useState<string[]>([]);
	const [search, setSearch] = useState<string>("");
	const [searchGames, setSearchGames] = useState<GlobalDownloads[]>([]);

	useEffect(() => {
		setIsImageLoading(true);
		window.api.getGamesByName(search).then((games) => {
			setSearchGames(games);
		});
	}, [search]);

	const searchImagesArr = useSearchImages(searchGames, setIsImageLoading);

	useEffect(() => {
		const timer = setTimeout(() => {
			setSearchImages(searchImagesArr);
		}, 1200);

		return () => {
			clearTimeout(timer);
			setSearchImages([]);
		};
	}, [searchImagesArr]);

	return (
		<div className="bg-[#171717]">
			<div className="flex gap-2 justify-between mt-10 me-10">
				<div className="ms-10 flex self-center">
					<h1 className="text-2xl font-bold">Catalog</h1>
				</div>{" "}
				<div
					className="rounded-md bg-zinc-800 flex p-2 ps-4 items-center"
					// When something is typed, set isSearching to true and set the current search string
					onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
						setIsSearching(e.target.value !== (undefined || ""));
						setSearch(e.target.value);
					}}
				>
					<img src={SearchIcon} alt="search-icon" className="size-4" />
					<Input
						className="max-w-[12vw] max-h-8 border-none focus-visible:ring-0 focus:max-w-[14vw] 
			focus-visible:ring-offset-0"
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
						{(!isImagesLoading && (
							<>
								<div
									id="games-section"
									className="mt-5 flex flex-wrap justify-between gap-4"
								>
									{games[1].map((_, key) => {
										return (
											<GameCard
												// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
												key={key}
												gameId={games[1][key].id}
												gameName={games[1][key].name}
												gameImage={images[key]}
											/>
										);
									})}
								</div>
								<div className="fixed right-1/2 left-3/4 z-20 top-full -translate-y-14 translate-x-48">
									<Button
										onClick={() => {
											games[0]((currentValue) => currentValue + 1);
											setIsImageLoading(true);
										}}
										className="bg-zinc-900/50 duration-300 transition-all hover:bg-zinc-900"
									>
										Next Page
									</Button>
								</div>
								<div className="fixed right-1/2 left-1/4 z-20 top-full -translate-y-14 -translate-x-12 w-fit rounded">
									<Button
										onClick={() => {
											games[0]((currentValue) => currentValue - 1);
											setIsImageLoading(true);
										}}
										{...(games[1][0].id < 30 && { disabled: true })}
										className="bg-zinc-900/50 duration-300 transition-all hover:bg-zinc-900"
									>
										Previous Page
									</Button>
								</div>
							</>
						)) || (
							<div className="mt-5 flex flex-wrap justify-between gap-4">
								{games[1].map((_, index) => {
									return (
										<Skeleton
											// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
											key={index}
											className="w-[16rem] mt-8 h-32 rounded-lg shadow-lg 
								shadow-black bg-zinc-800"
										/>
									);
								})}
							</div>
						)}
					</>
				)) ||
					(!isImagesLoading && (
						<div className="mt-5 flex flex-wrap justify-between gap-4">
							{searchGames?.map((game, index) => {
								return (
									<GameCard
										// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
										key={index}
										gameId={game.id}
										gameName={game.name}
										gameImage={searchImages[index]}
									/>
								);
							})}
						</div>
					)) ||
					(
					<div className="mt-5 flex flex-wrap justify-between gap-4">
						{searchGames?.map((_, index) => {
							return (
								// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
								<div key={index}>
									<Skeleton className="h-[8rem] w-[17.5vw] rounded-lg" />
								</div>
							);
						})}
					</div>
					)}
			</div>
		</div>
	);
}