import { useEffect, useState } from "react";

export function useDownloads() {
	const [downloadsInfo, setDownloadsInfo] = useState<number>(0);
    useEffect(() => {
		window.electron.ipcRenderer.on(
			"updateTorrentProgress",
			(_event, torrentProgress: number) => {
				setDownloadsInfo(torrentProgress);
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