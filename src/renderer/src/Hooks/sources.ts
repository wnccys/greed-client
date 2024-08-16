import { useEffect, useState } from "react";

export function useSources() {
	const [sources, setSources] = useState([]);

    useEffect(() => {
        window.electron.ipcRenderer.on("getSourcesList", (sources) => {
            setSources(sources);
            console.log("received source: ", sources);
        })

        window.electron.ipcRenderer.removeAllListeners("getSourcesList");
    }, []);

	useEffect(() => {
		window.electron.ipcRenderer.on("updateSourcesList", (sources) => {
			setSources(sources);
		});

        return () => {
            window.electron.ipcRenderer.removeAllListeners("updateSourcesList");
        }
		// TODO remove all channel listeners;
	}, []);

	return sources;
}