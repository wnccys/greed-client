import { InputFile } from "@renderer/components/ui/inputfile";
import GameDummyImage from "@renderer/assets/image.png";
import { useState } from "react";
import { Link } from "react-router-dom";
import ArrowIcon from "@renderer/assets/icon-back.png";

export function SelectedGame() {
	const [downloadResult, setDownloadResult] = useState<string | undefined>(
		undefined,
	);

	return (
		<>
			<div id="game-cover">
				<div className="absolute text-lg translate-x-8 translate-y-6">
					<Link to="../catalog">
						<img src={ArrowIcon} alt="back-icon" className="size-9"/>	
					</Link>
				</div>
				<img src={GameDummyImage} alt="game-cover" className="rounded-e-md" />
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
