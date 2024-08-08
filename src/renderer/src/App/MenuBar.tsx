import { Button } from "@renderer/ShadComponents/ui/button";
import {
	Cross1Icon,
	SquareIcon,
	MinusIcon,
	CopyIcon,
} from "@radix-ui/react-icons";
import { useEffect, useState } from "react";

export function MenuBar() {
	const [isMaximized, setIsMaximized] = useState<boolean>(
		window.api.isMaximized()  
	);

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

	const [data, setData] = useState<string>("");
	useEffect(() => {
		window.electron.ipcRenderer.on(
			"updateTorrentProgress",
			(_event, torrentProgress: string) => {
				setData(torrentProgress);
			},
		);

		return () => {
			// Clean up the listener when the component is unmounted
			window.electron.ipcRenderer.removeAllListeners("updateTorrentProgress");
		};
	}, []);

	const checkIsMaximized = () => {
		if (isMaximized) {
			window.api.unmaximizeWindow();
			setIsMaximized(!isMaximized);
		} else {
			window.api.maximizeWindow();
			setIsMaximized(!isMaximized);
		}
	};

	return (
		<>
			<div
				id="menu-bar"
				className="h-[1.8rem] bg-[#171717] fixed flex w-full z-10 justify-end"
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
						{JSON.stringify(isMaximized)}
						{isMaximized ? <CopyIcon /> : <SquareIcon />}
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
			<p>Torrent Progress: {JSON.stringify(data)}</p>
		</>
	);
}
