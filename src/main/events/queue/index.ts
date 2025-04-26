import { syncronizeQueue } from "@main/model/queue";
import { BrowserWindow, type IpcMainEvent, type IpcMainInvokeEvent } from "electron";

export async function handleUpdateQueueItems(queueItems: IpcMainEvent) {
	for (const win of BrowserWindow.getAllWindows()) {
		win.webContents.send("updateQueueItems", queueItems);
	}
}

export async function handleGetCurrentQueueItems(_event: IpcMainInvokeEvent) {
	return await syncronizeQueue();
}