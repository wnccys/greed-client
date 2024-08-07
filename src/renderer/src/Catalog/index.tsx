import { Input } from "@renderer/components/ui/input";
import { SearchIcon } from "@renderer/assets/icons";
import { CustomCarousel } from "@renderer/components/ui/CustomCarousel";
import GameDummyImage from "@renderer/assets/image.png";
import { Link } from "react-router-dom";
import { useRef } from "react";
import { GameCards } from "@renderer/components/ui/GameCard";

export function Catalog() {
	return (
		<>
			<div className="flex gap-2 max-h-[10vh] justify-between mt-10 me-10">
				<div className="ms-10 flex self-center">
					<h1 className="text-2xl font-bold">Catalog</h1>
				</div>{" "}
				<div
					className="rounded-md bg-zinc-800 flex p-2 ps-4 
				items-center hover:shadow-xl"
				>
					<img src={SearchIcon} alt="search-icon" className="size-4" />
					<Input
						className="max-w-[12vw] max-h-8 border-none focus-visible:ring-0 
                        focus:max-w-[14vw] focus-visible:ring-offset-0"
						type="text"
						placeholder="Search"
					/>
				</div>
			</div>

			<div className="ms-8 mt-[2rem] h-full me-10">
				<div
					className="bg-zinc-950 shadow-lg hover:drop-shadow-2xl
                transition-colors shadow-black rounded-lg"
				>
					<CustomCarousel />
				</div>
				<div
					id="games-section"
					className="mt-5 flex flex-wrap shrink content-evenly justify-between"
				>
					<GameCards />
				</div>
			</div>
		</>
	);
}
