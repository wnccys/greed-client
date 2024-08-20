import { Input } from "@renderer/ShadComponents/ui/input";
import { SearchIcon } from "@renderer/Assets/icons";
import { CustomCarousel } from "./CustomCarousel";
import { GameCard } from "./GameCard";
import { useCatalogGames } from "@renderer/Hooks/games";

export function Catalog() {
	const games = useCatalogGames();

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
					{Array.from({ length: 16 }).map((_, key) => {
						// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
						return <GameCard key={key} />
					})}
				</div>
			</div>
		</div>
	);
}
