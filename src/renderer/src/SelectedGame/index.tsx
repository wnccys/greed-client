import { InputFile } from "@renderer/components/ui/inputfile";
import GameDummyImage from "@renderer/assets/image.png";
import { useState } from "react";
import { Link } from "react-router-dom";
import { DoubleArrowLeftIcon } from "@radix-ui/react-icons";

export function SelectedGame() {
	const [downloadResult, setDownloadResult] = useState<string | undefined>(
		undefined,
	);

	return (
		<>
			<div id="game-cover" className="mt-6">
				<div className="absolute text-lg translate-x-8 translate-y-6">
					<Link to="../catalog">
						<DoubleArrowLeftIcon className="size-5 transition 
                            delay-150 hover:-translate-y-1 hover:scale-105 duration-[300]"/>
					</Link>
				</div>
				<img src={GameDummyImage} alt="game-cover" className="" />
			</div>

			<div id="play-menu" className="flex justify-center pt-5">
				<div
					className="absolute transform -translate-y-2/3 bg-[#242424] 
                        rounded-3xl text-white p-4"
				>
					<InputFile updateDownloadResult={setDownloadResult} />
					{/* <p className={`pt-4 ${downloadResult ? '' : 'hidden p-0 m-0'}`}>{downloadResult}</p> */}
				</div>
			</div>
		</>
	);
}
