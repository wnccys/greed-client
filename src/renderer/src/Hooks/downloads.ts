import { useEffect, useState } from "react";

type downloadsInfo = {
	game: string;
	currentProgress: number;
	timeRemaining: number;
	downloadSpeed: number;
};

export function useDownloads(): downloadsInfo {
	const [downloadsInfo, setDownloadsInfo] = useState<downloadsInfo>({
		game: "",
		currentProgress: 0,
		timeRemaining: 0,
		downloadSpeed: 0,
	});
	useEffect(() => {
		window.electron.ipcRenderer.on(
			"updateTorrentProgress",
			(_event, torrentInfos: downloadsInfo) => {
				setDownloadsInfo(torrentInfos);
			},
		);

		return () => {
			// Clean up the listener when the component is unmounted
			// FIXME remove listeners correctly (removeListeners);
			// window.electron.ipcRenderer.removeAllListeners("updateTorrentProgress");
		};
	}, []);

	return downloadsInfo;
}