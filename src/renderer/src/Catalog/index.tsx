import { Input } from "@renderer/ShadComponents/ui/input";
import { SearchIcon } from "@renderer/Assets/icons";
import { CustomCarousel } from "./CustomCarousel";
import { GameCard } from "./GameCard";
import { useCatalogGames } from "@renderer/Hooks/games";
import { Button } from "@renderer/ShadComponents/ui/button";
import { useEffect } from "react";

export function Catalog() {
	const games = useCatalogGames();

	useEffect(() => {
		for (const game of games[1]) {
			fetch(
				`https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/${game.id}/header.jpg`,
			)
				.then((image) => image.blob())
				.then((blobImage) => {
					const reader = new FileReader();
					reader.onload = function () {
						// console.log(this.result);
						games[2].push(this.result as string);
						console.log("games[2]: ", games[2]);
					};
					reader.readAsDataURL(blobImage);
				})
			.catch((e) => {
					console.log("Error: ", e);
			});
		}
	}, [games[1], games[2]])

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
						return <GameCard 
							// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
							key={key} 
							gameName={games[1][key].name} 
							gameImage={games[2][key]} 
						/>
					})}
				</div>
				<div 
					className="fixed right-1/2 left-3/4 z-20 top-full -translate-y-14 translate-x-48"
				>
					<Button onClick={() => games[0]((currentValue) => currentValue + 1)}
					>
						Next Page
					</Button>
				</div>
				<div 
					className="fixed right-1/2 left-1/4 top-full z-20 -translate-y-14 -translate-x-12"
				>
					<Button onClick={() => games[0]((currentValue) => currentValue - 1)}
						{...(games[1].length < 15 && { disabled: true } ) }
					>
						Previous Page
					</Button>
				</div>
			</div>
		</div>
	);
}
