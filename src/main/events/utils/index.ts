import { BrowserWindow, shell } from "electron";

export async function handleOpenHydraLinks() {
	shell.openExternal("https://hydralinks.cloud/sources/");
}

export function handleIsNoLongerLoading() {
	for (const win of BrowserWindow.getAllWindows()) {
		win.webContents.send("isNoLongerLoading");
	}
}

export async function handleExecGamePath(_event, execPath: string) {
	shell.openPath(execPath);
}
