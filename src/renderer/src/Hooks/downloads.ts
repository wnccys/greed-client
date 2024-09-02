import { useEffect, useState } from "react";

type downloadsInfo = {
	game: string;
	uri: string;
	currentProgress: number;
	timeRemaining: number;
	downloadSpeed: number;
	downloaded: number;
	totalSize: number;
	peers: number;
	active: false;
};

export function useDownloads(): downloadsInfo {
	const [downloadsInfo, setDownloadsInfo] = useState<downloadsInfo>({
		game: "",
		uri: "",
		currentProgress: 0,
		timeRemaining: 0,
		downloadSpeed: 0,
		downloaded: 0,
		totalSize: 0,
		peers: 0,
		active: false,
	});
	useEffect(() => {
		window.electron.ipcRenderer.on(
			"updateTorrentInfos",
			(_event, torrentInfos: downloadsInfo) => {
				setDownloadsInfo(torrentInfos);
			},
		);

		return () => {
			window.electron.ipcRenderer.removeAllListeners("updateTorrentInfos");
		};
	}, []);

	return downloadsInfo;
}

export function useDownloadProgress(){
	const [downloadProgress, setDownloadProgress] = useState<number>(0);

	useEffect(() => {
		window.electron.ipcRenderer.on(
			"updateTorrentProgress",
			(_event, torrentProgress: number) => {
				setDownloadProgress(torrentProgress);
			},
		);
		
		return () => {
			window.electron.ipcRenderer.removeAllListeners("updateTorrentProgress");
		}
	}, [])

	return downloadProgress;
}