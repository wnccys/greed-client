import { Input } from "@renderer/ShadComponents/ui/input";
import { SearchIcon } from "@renderer/Assets/icons";
import { CustomCarousel } from "./CustomCarousel";
import { GameCard } from "./GameCard";
import { useCatalogGames, useGamesImages } from "@renderer/Hooks/games";
import { Button } from "@renderer/ShadComponents/ui/button";
import { useEffect, useState } from "react";
import { Skeleton } from "@renderer/ShadComponents/ui/skeleton";

export function Catalog() {
	const [games, setCatalogGames, setIndex] = useCatalogGames();
	const images = useGamesImages(games);

	const [search, setSearch] = useState<string>("");

	useEffect(() => {
		console.log("games: ", games);
	}, [games]);

	useEffect(() => {
		if (!search) {
			window.api.getGamesRange(0).then((games) => {
				setCatalogGames(games);
			});

			return;	
		};

		window.api.getGamesByName(search).then((games) => {
			setCatalogGames(games);
		});
	}, [search, setCatalogGames]);

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
					<>
						<FeaturedCarousel games={games} />
						<RegularGamesCardSection
							games={games}
							images={images}
							setIndex={setIndex}
						/>
					</>
			</div>
		</div> 
		)
}

function FeaturedCarousel({ games }: { games: Game[] }) {
	return (
		// Verifies if user is at first page on catalog
		games[14]?.id <= 340 && (
			<div className="shadow-lg transition-colors shadow-black border border-white">
				<CustomCarousel />
		</div>)
	);
}

function RegularGamesCardSection({
	games,
	images,
	setIndex,
}: {
	games: Game[];
	images: {
		data: (string | undefined)[];
		pending: boolean[];
	};
	setIndex: React.Dispatch<React.SetStateAction<number>>
}) {
	return (
		<div className="h-full">
			<div
				id="games-section"
				className="grid grid-cols-4 justify-between gap-4"
			>
				{games.map((_, key) => {
					if (!images.pending[key]) {
						return (
							<GameCard
								// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
								key={key}
								gameId={games[key].id}
								gameName={games[key].name}
								gameImage={images.data[key]}
							/>
						);
					}

					return <Skeleton
						// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
						key={key}
						className="w-[16rem] mt-8 h-32 rounded-lg shadow-lg 
						shadow-black bg-zinc-800"
					/>
				})}
			</div>
			<div className="fixed right-1/2 left-3/4 z-20 top-full -translate-y-14 translate-x-48">
				<Button
					onClick={() => {
						setIndex((oldIndex) => oldIndex + 1);
					}}
					className="bg-zinc-900/50 duration-300 transition-all hover:bg-zinc-900"
				>
					Next Page
				</Button>
			</div>
			<div className="fixed right-1/2 left-1/4 z-20 top-full -translate-y-14 -translate-x-12 w-fit rounded">
				<Button
					onClick={() => {
						setIndex((index) => index - 1);
					}}
					{...(games[0]?.id < 30 && { disabled: true })}
					className="bg-zinc-900/50 duration-300 transition-all hover:bg-zinc-900"
				>
					Previous Page
				</Button>
			</div>
		</div>
	);
}