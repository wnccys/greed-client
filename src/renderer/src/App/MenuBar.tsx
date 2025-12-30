import { Progress } from "@renderer/ShadComponents/ui/progress";
import { Link, useLocation } from "react-router-dom";
import { useDownloadProgress } from "@renderer/Hooks/downloads";

export function MenuBar() {
	const location = useLocation();
	const downloadProgress = useDownloadProgress();

	return (
		<>
			<div
				id="menu-bar"
				className="fixed h-[2.1rem] bg-[#171717] flex w-full z-50 justify-end"
			/>
			{downloadProgress > 0 && location.pathname !== "/downloads" && (
				<Link
					to="../downloads"
					className="self-center h-[2rem] bg-zinc-950
			hover:bg-zinc-800 fixed flex w-full z-10 justify-center
			bottom-0 hover:duration-300 transition-all selectable"
				>
					<div className="self-center flex w-[30%] ms-[12rem]">
						<p className="text-sm me-4">{downloadProgress}%</p>
						<Progress
							value={downloadProgress}
							className="bg-zinc-800 self-center duration-200 transition-all"
						/>
					</div>
				</Link>
			)}
		</>
	);
}
