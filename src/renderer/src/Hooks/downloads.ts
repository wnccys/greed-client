import { useEffect, useState } from "react";

type downloadsInfo = {
	game: string;
	currentProgress: number;
	timeRemaining: number;
	downloadSpeed: number;
	downloaded: number;
	totalSize: number;
	isPaused: boolean;
};

export function useDownloads(): downloadsInfo {
	const [downloadsInfo, setDownloadsInfo] = useState<downloadsInfo>({
		game: "",
		currentProgress: 0,
		timeRemaining: 0,
		downloadSpeed: 0,
		downloaded: 0,
		totalSize: 0,
		isPaused: true,
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