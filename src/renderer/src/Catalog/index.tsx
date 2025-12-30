import { Input } from "@renderer/ShadComponents/ui/input";
import { SearchIcon } from "@renderer/Assets/icons";
import { CustomCarousel } from "./CustomCarousel";
import { GameCard } from "./GameCard";
import { useCatalogGames, useGamesImages } from "@renderer/Hooks/games";
import { Button } from "@renderer/ShadComponents/ui/button";
import { useEffect, useState } from "react";
import { Skeleton } from "@renderer/ShadComponents/ui/skeleton";

export function Catalog() {
	const [games, setCatalogGames, index, setIndex] = useCatalogGames();
	const images = useGamesImages(games);

	const [search, setSearch] = useState<string>("");

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
		<div className="bg-[#171717] mx-5">
			<div className="flex justify-between mt-10 me-10">
				<div className="ms-10 flex self-center">
					<h1 className="text-2xl font-bold">Catalog</h1>
				</div>{" "}
				<div
					className="rounded-md bg-zinc-800 flex p-2 ps-4 items-center"
					onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
						setSearch(e.target.value);
					}}
				>
					<img src={SearchIcon} alt="search-icon" className="size-4" />
					<Input
						className="max-w-[12vw] max-h-8 border-none focus:border-none focus:ring-0 focus:ring-offset-0 focus-visible:shadow-none transition-[max-width]
						focus-visible:ring-0 focus-visible:ring-offset-0 focus:outline-none focus:max-w-[14vw] ease-[cubic-bezier(0.4,0,0.2,1)] duration-200"
						type="text"
						placeholder="Search Games"
					/>
				</div>
			</div>

			<div className="mt-[2rem] bg-[#171717]">
					<>
						{ !search && index === 0 && <FeaturedCarousel /> }
						<CardSection
							games={games}
							images={images}
						/>
						<div className="sticky bottom-0 z-20 w-full mt-6">
							<div className="flex justify-between w-full bg-zinc-900 h-10 border-zinc-800 border-2 border-primary-foreground items-center border-x-0">
									<Button
										onClick={() => {
											setIndex((index) => index - 1);
										}}
										{...(games[0]?.appid < 30 && { disabled: true })}
										className="bg-transparent duration-300 transition-all hover:bg-zinc-950"
									>
										Previous Page
									</Button>
									<Button
										onClick={() => {
											setIndex((oldIndex) => oldIndex + 1);
										}}
										className="bg-transparent duration-300 transition-all hover:bg-zinc-950"
									>
										Next Page
									</Button>
							</div>
						</div>
					</>
			</div>
		</div>
    )
}

function FeaturedCarousel() {
	return (
		// Verifies if user is at first page on catalog
        <div className="shadow-lg transition-colors shadow-black border border-white">
            <CustomCarousel />
		</div>
    )
}

function CardSection({
	games,
	images,
}: {
	games: Game[];
	images: {
		data: (string | undefined)[];
		pending: boolean[];
	};
}) {
	return (
		<div className="h-full">
			<div
				id="games-section"
				className="grid grid-cols-4 justify-between justify-items-center gap-0"
			>
				{games.map((_, key) => {
					if (!images.pending[key]) {
						return (
							<GameCard
								// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
								key={key}
								gameId={games[key].appid}
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
		</div>
	);
}