import { Input } from "@renderer/ShadComponents/ui/input";
import { SearchIcon } from "@renderer/assets/icons";
import { GameCardLib } from "@renderer/Library/LibCard";


export function Library() {
return (
<div className="bg-[#171717]">   {/* container father */}
			<div className="flex gap-2 justify-between mt-10 me-10">

				<div className="ms-10 flex self-center">
					<h1 className="text-2xl font-bold">Library</h1>
				</div>
				
				<div //container children
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
			

				<GameCardLib/>
				<GameCardLib/>
				<GameCardLib/> <GameCardLib/>
				
            </div>

			
);


}