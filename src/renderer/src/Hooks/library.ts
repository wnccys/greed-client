import { useEffect, useState } from "react";

export function useLibrary() {
	const [library, setLibrary] = useState<LibraryItem[]>([]);

	useEffect(() => {
		window.api.getLibraryGames().then((libraryGames) => {
			setLibrary(libraryGames);
		});
	}, []);

	useEffect(() => {
		window.electron.ipcRenderer.on(
			"updateLibrary",
			(_event, libraryGames: LibraryItem[]) => {
				console.log("received library: ", libraryGames);
				setLibrary(libraryGames);
			},
		);

		return () => {
			window.electron.ipcRenderer.removeAllListeners("updateLibrary");
		};
	}, []);

	return library;
}
