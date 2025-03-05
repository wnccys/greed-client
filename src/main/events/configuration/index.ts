import { changeDBDefaultPath, getDBCurrentPath } from "@main/model/configs";
import { addNewGameRegisteredPath, getGameRegisteredPath, removeGameFromLibrary } from "@main/model/library";
import { BrowserWindow, dialog, IpcMainEvent, IpcMainInvokeEvent, shell } from "electron";
import path from "node:path";
import { handleGetLibraryGames } from "@main/events/library";

// ----Path Select Handling----
export async function handleChangeDefaultPath(): Promise<string[]> {
	const { canceled, filePaths } = await dialog.showOpenDialog({
		title: "Select Folder",
		properties: ["openDirectory"],
	});

	if (!canceled) {
		return await changeDBDefaultPath(filePaths);
	}

	return Promise.resolve(["Error", "Path can't be empty."]);
}

export async function handleUpdateDownloadPath(newPath: IpcMainEvent) {
	for (const win of BrowserWindow.getAllWindows()) {
		win.webContents.send("updateDownloadPath", newPath);
	}
}

export async function handleGetCurrentDownloadPath() {
	return await getDBCurrentPath();
}

export async function handleVerifyGameRegisteredPath(
	_event: IpcMainInvokeEvent,
	gameName: string,
	gameSteamId: number,
	gameIcon: string,
	gameURIS: string[],
): Promise<string[]> {
	const gamePathObj = await getGameRegisteredPath(gameSteamId);
	if (gamePathObj) {
		shell.openPath(gamePathObj.execPath).then((result) => {
			if (result) {
				console.error("Error executing as admin: ", result);
			}

			console.log("Success running file.");
		});

		return ["Success", "App Initiated"];
	}

	const { canceled, filePaths } = await dialog.showOpenDialog({
		title: "Select Game Executable",
		properties: ["openFile"],
		filters: [{ name: "Executables", extensions: ["exe"] }],
	});

	const fileExtension = path.extname(filePaths[0]).toLowerCase();

	if (fileExtension !== ".exe") {
		return ["Error", "Only executables are allowed."];
	}

	if (canceled) {
		return ["Warning", "No Path Selected."];
	}

	await addNewGameRegisteredPath(
		gameName,
		gameSteamId,
		gameIcon,
		gameURIS,
		filePaths[0],
	);
	return ["Success", "Path added."];
}

export async function handleRemoveGamePath(_event, pathId: number) {
	removeGameFromLibrary(pathId).then(async () => {
		for (const win of BrowserWindow.getAllWindows()) {
			const newLibrary = await handleGetLibraryGames();
			win.webContents.send("updateLibrary", newLibrary);
		}
	});
}

export async function handleUpdateLibrary() {
	for (const win of BrowserWindow.getAllWindows()) {
		const newLibrary = await handleGetLibraryGames();
		win.webContents.send("updateLibrary", newLibrary);
	}
}