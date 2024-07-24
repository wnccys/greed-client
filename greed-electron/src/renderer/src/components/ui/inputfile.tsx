import { Input } from "@renderer/components/ui/input";
import { Button } from "@renderer/components/ui/button";
import { useState } from "react";

export function InputFile() {
	const [filePath, setFilePath] = useState<string | undefined>(undefined);

	function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
		const files = e.target.files;

		if (files?.[0].path) {
			setFilePath(files[0].path);
		}
	}

	function sendTorrentFilePath() {
		window.electron.ipcRenderer.invoke("torrentReceiver", filePath);
	}

	return (
		<div className="grid w-full max-w-sm items-center gap-1.5">
			<Input type="file" onChange={handleFileSelect} />
			<Button onClick={sendTorrentFilePath}>Download Torrent</Button>
		</div>
	);
}
