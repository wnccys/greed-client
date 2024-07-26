import { Button } from "@renderer/components/ui/button";
import { useState } from "react";

interface InputFileProps {
	updateDownloadResult: React.Dispatch<React.SetStateAction<string | undefined>>,
}

export function InputFile({ updateDownloadResult }: InputFileProps){
	const [filePath, setFilePath] = useState<string | undefined>(undefined);

	async function handleFileSelect() {
		const filePath = window.api.handleFileSelect();

		setFilePath(filePath);
	}

	async function sendTorrentFilePath() {
		const result = await window.api.sendTorrentPath(filePath);

		updateDownloadResult(result);
	}

	return (
		<div className="grid w-full max-w-sm items-center gap-1.5">
			<Button onClick={handleFileSelect}>Select Torrent File</Button>
			<Button onClick={sendTorrentFilePath}>Download Torrent</Button>
			<p>{filePath}</p>
		</div>
	);
}
