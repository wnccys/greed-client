import { InputFile } from "@renderer/components/ui/inputfile";
import { useState } from "react";

export function SelectedGame() {
	const [downloadResult, setDownloadResult] = useState<string | undefined>(
		undefined,
	);

	return (
		// TODO fix indentation
		<>
			<div id="game-cover">
				<img
					src="./src/assets/image.png"
					alt="game-cover"
					className="rounded-e-md"
				/>
			</div>

			<div id="play-menu" className="flex justify-center pt-5">
				<div 
                    className="absolute transform -translate-y-2/3 bg-[#242424] 
                        rounded-3xl text-white p-4">
					<InputFile updateDownloadResult={setDownloadResult} />
					{/* <p className={`pt-4 ${downloadResult ? '' : 'hidden p-0 m-0'}`}>{downloadResult}</p> */}
				</div>
			</div>
		</>
	);
}
