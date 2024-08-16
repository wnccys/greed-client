import { Button } from "@renderer/ShadComponents/ui/button";
import {
	Cross1Icon,
	MinusIcon,
} from "@radix-ui/react-icons";
import { Progress } from "@renderer/ShadComponents/ui/progress"
import { Link, useLocation } from "react-router-dom";
import { useDownloads } from "@renderer/Hooks/downloads";

export function MenuBar() {
	const location = useLocation();
	const downloadsInfo = useDownloads().currentProgress;

	return (
		<>
			<div
				id="menu-bar"
				className="h-[2.1rem] bg-[#171717] flex fixed w-full z-10 justify-end"
			>
				<div className="p-0 m-0 no-drag">
					<Button
						className="hover:bg-zinc-700 bg-[#171717] rounded-none 
					rounded-s-md delay-100 ps-3 pe-3 h-[1.8rem]"
					>
						<MinusIcon />
					</Button>
					<Button
						className="hover:bg-zinc-700 bg-[#171717] rounded-none
					delay-100 ps-3 pe-3 h-[1.8rem]"
					>
					</Button>
					<Button
						className="hover:bg-red-500 delay-100 bg-[#171717] rounded-none
					rounded-e-md ps-3 pe-3 h-[1.8rem]"
					>
						<Cross1Icon />
					</Button>
				</div>
			</div>
			{ downloadsInfo > 0 && location.pathname !== "/downloads" &&
			<Link to="../downloads" className="self-center h-[2rem] bg-zinc-950 
				hover:bg-zinc-800 fixed flex w-full z-10 justify-center 
				bottom-0 hover:duration-300 transition-all selectable">
				<div className="self-center flex w-[30%] ms-[12rem]">
					<p className="text-sm me-4">{downloadsInfo}%</p>
					<Progress value={downloadsInfo} className="bg-zinc-800 self-center" />
				</div>
			</Link>
			}
		</>
	);
}