import { GreedDataSource } from "@main/data-source";
import { GreedSettings } from "@main/model/entity/Settings";
import { ipcMain } from "electron";

export async function changeDBDefaultPath(folderPath: string[]) {
	try {
		const currentPath = await GreedDataSource.getRepository(
			GreedSettings,
		).findOneBy({
			id: 1,
		});

		if (currentPath) {
			currentPath.downloadPath = folderPath[0];
			await GreedDataSource.manager.save(currentPath);

			ipcMain.emit("updateDownloadPath", currentPath.downloadPath);

			return ["Success", "Download Path Updated."];
		}

		return ["Error", "Default Path not Found."];
	} catch (e) {
		return ["Error", "Could not update default path."];
	}
}

export async function getDBCurrentPath() {
	return await GreedDataSource.getRepository(GreedSettings)
		.findOneBy({
			id: 1,
		})
		.then((record) => record?.downloadPath || "No Path");
}