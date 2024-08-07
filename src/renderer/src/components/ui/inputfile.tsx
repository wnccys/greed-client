import { Button } from "@renderer/components/ui/button";
import { useState } from "react";

interface InputFileProps {
	updateDownloadResult: React.Dispatch<React.SetStateAction<string | undefined>>,
}

export function InputFile({ updateDownloadResult }: InputFileProps){
	const [filePath, setFilePath] = useState<string | undefined>(undefined);
	const [fileUploadFeedback, setFileUploadFeedback] = useState<string | undefined>(undefined);

	async function handleFileSelect() {
		const [UploadFeedback, filePath] = await window.api.handleFileSelect();

		setFilePath(filePath);
		setFileUploadFeedback(UploadFeedback);
	}

	async function sendTorrentFilePath() {
		if (filePath) {
			const result = await window.api.sendTorrentPath(filePath);
			updateDownloadResult(result);
		}
	}

	return (
		<div className="grid w-full max-w-sm items-center gap-1.5">
			<Button onClick={handleFileSelect}>Select Torrent File</Button>
			<Button onClick={sendTorrentFilePath}>Download Torrent</Button>
			<p className={fileUploadFeedback ? '' : 'hidden'}>{fileUploadFeedback}</p>
		</div>
	);
}
