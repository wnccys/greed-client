import {
    type IpcMainEvent,
    type IpcMainInvokeEvent,
    dialog,
} from 'electron'
import path from 'node:path'
import { initTorrentDownload } from './torrentClient';

export function handleUpdateTorrentProgress(
	torrentProgress: IpcMainEvent,
) {
	console.log(`Updated torrent progress: ${(Number(torrentProgress) / 1000).toFixed(1)}`);
}

export async function handleFileOpen(): Promise<Array<string>> {
	const { canceled, filePaths } = await dialog.showOpenDialog({
		title: "Select File",
		properties: ["openFile"],
	});

	if (!canceled) {
		console.log(filePaths);
		return [`Selected File: ${path.basename(filePaths[0])}`, filePaths[0]];
	}

	return ["", "Please, Select a Valid Torrent File"];
}

export async function handleTorrentPath(_event: IpcMainInvokeEvent, path: string) {
	console.log("path to torrent is: ", path);
	const { canceled, filePaths } = await dialog.showOpenDialog({
		title: "Select Folder",
		properties: ["openDirectory", "createDirectory"],
	});

	if (!canceled) {
		initTorrentDownload(path, filePaths[0]);
	}
}

export async function handleNewTorrentSource(
	_event: IpcMainInvokeEvent,
	sourceLink: string,
) {
	console.log(`sourceLink: ${sourceLink}`);

	try {
		fetch(sourceLink)
			.then((response: Response) => response.json())
			.then((body: ReadableStream<Uint8Array> | null) => {
				const stringifiedBody = JSON.parse(JSON.stringify(body));
				console.log(stringifiedBody.name);
				console.log(stringifiedBody.downloads[0]);
			})
			.catch((e) =>
				console.error(
					`Could not fetch from given link: ${sourceLink}.\n Error: ${e}.`,
				),
			);
	} catch (e) {
		console.error(e);
	}
}