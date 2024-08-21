import { Input } from "@renderer/ShadComponents/ui/input";
import { SearchIcon } from "@renderer/Assets/icons";
import { CustomCarousel } from "./CustomCarousel";
import { GameCard } from "./GameCard";
import { useCatalogGames, useGamesImages } from "@renderer/Hooks/games";
import { Button } from "@renderer/ShadComponents/ui/button";

export function Catalog() {
	const games = useCatalogGames();
	const images = useGamesImages(games[1]);

	return (
		<div className="bg-[#171717]">
			<div className="flex gap-2 justify-between mt-10 me-10">
				<div className="ms-10 flex self-center">
					<h1 className="text-2xl font-bold">Catalog</h1>
				</div>{" "}
				<div
					className="rounded-md bg-zinc-800 flex p-2 ps-4 
			items-center hover:shadow-xl"
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
				<div
					className="shadow-lg hover:drop-shadow-2xl
                transition-colors shadow-black rounded-lg"
				>
					<CustomCarousel />
				</div>
				<div
					id="games-section"
					className="mt-5 flex flex-wrap justify-between gap-4"
				>
					{games[1].map((_, key) => {
						return (
							<GameCard
								// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
								key={key}
								gameName={games[1][key].name}
								gameImage={images[key]}
							/>
						);
					})}
				</div>
				<div className="fixed right-1/2 left-3/4 z-20 top-full -translate-y-14 translate-x-48 hover:bg-zinc-900">
					<Button 
						onClick={() => games[0]((currentValue) => currentValue + 1)}
						className="bg-zinc-900/30 duration-300 transition-all"
					>
						Next Page
					</Button>
				</div>
				<div className="fixed right-1/2 left-1/4 z-20 top-full -translate-y-14 -translate-x-12 hover:bg-zinc-900 w-fit rounded">
					<Button
						onClick={() => games[0]((currentValue) => currentValue - 1)}
						{...(games[1][0].id < 30 && { disabled: true })}
						className="bg-zinc-900/30 duration-300 transition-all"
					>
						Previous Page
					</Button>
				</div>
			</div>
		</div>
	);
}