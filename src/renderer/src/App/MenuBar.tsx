import { Button } from "@renderer/ShadComponents/ui/button";
import {
	Cross1Icon,
	SquareIcon,
	MinusIcon,
	CopyIcon,
} from "@radix-ui/react-icons";
import { useEffect, useState } from "react";
import { Progress } from "@renderer/ShadComponents/ui/progress"
import { Link } from "react-router-dom";

export function MenuBar() {
	const [isMaximized, setIsMaximized] = useState<boolean>(false);

	useEffect(() => {
		window.electron.ipcRenderer.on(
			"updateMaximizedState",
			(_event, maximizedState: boolean) => {
				setIsMaximized(maximizedState);
				console.log(`Updated maximized state ${maximizedState}`);
			},
		);

		return () => {
			window.electron.ipcRenderer.removeAllListeners("updateMaximizedState");
		};
	}, []);

	const [data, setData] = useState<number>(0);
	useEffect(() => {
		window.electron.ipcRenderer.on(
			"updateTorrentProgress",
			(_event, torrentProgress: number) => {
				setData(torrentProgress);
			},
		);

		return () => {
			// Clean up the listener when the component is unmounted
			window.electron.ipcRenderer.removeAllListeners("updateTorrentProgress");
		};
	}, []);

	const checkIsMaximized = () => {
		setIsMaximized(!isMaximized);
		if (isMaximized) {
			window.api.unmaximizeWindow();
		} else {
			window.api.maximizeWindow();
		}
	};

	return (
		<>
			<div
				id="menu-bar"
				className="h-[2rem] bg-[#171717] fixed flex w-full z-10 justify-end"
			>
				<div className="p-0 m-0">
					<Button
						onClick={() => window.api.minimizeWindow()}
						className="hover:bg-zinc-700 bg-[#171717] rounded-none 
					rounded-s-md delay-100 ps-3 pe-3 h-[1.8rem]"
					>
						<MinusIcon />
					</Button>
					<Button
						onClick={() => checkIsMaximized()}
						className="hover:bg-zinc-700 bg-[#171717] rounded-none
					delay-100 ps-3 pe-3 h-[1.8rem]"
					>
						{isMaximized === true ? <CopyIcon /> : <SquareIcon />}
					</Button>
					<Button
						onClick={() => window.api.closeWindow()}
						className="hover:bg-red-500 delay-100 bg-[#171717] rounded-none
					rounded-e-md ps-3 pe-3 h-[1.8rem]"
					>
						<Cross1Icon />
					</Button>
				</div>
			</div>
			{ data > 0 &&
			<div className="h-[2rem] bg-zinc-950 fixed flex w-full z-10 justify-center bottom-0">
				<div className="self-center flex w-[30%] ms-[12rem]">
					<p className="text-sm me-4">{data}%</p>
					<Link to="../downloads" className="self-center w-[100%]">
						<Progress value={data} className="bg-zinc-800 self-center" />
					</Link>
				</div>
			</div>
			}
		</>
	);
}