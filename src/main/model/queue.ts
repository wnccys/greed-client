import { GreedDataSource } from "@main/data-source";
import { Queue } from "@main/model/entity/Queue";

export async function pauseOnQueue(torrentId: string) {
	const toBeChanged = await GreedDataSource.getRepository(Queue).findOneBy({
		torrentId: torrentId,
	});

	if (toBeChanged) {
		toBeChanged.status = "paused";
		await GreedDataSource.getRepository(Queue).save(toBeChanged);
	}
}

export async function addToQueue({ name, size, torrentId, progress }) {
	console.log("Received in addToQueue: ", name, size, progress);
	await GreedDataSource.getRepository(Queue).save({
		torrentId,
		name,
		size,
		progress,
		status: "downloading",
	});
}

export async function resumeOnQueue(torrentId: string) {
	const toBeChanged = await GreedDataSource.getRepository(Queue).findOneBy({
		torrentId: torrentId,
	});

	if (toBeChanged) {
		toBeChanged.status = "downloading";
		await GreedDataSource.getRepository(Queue).save(toBeChanged);
	}
}

export async function verifyIfOnQueue(magnetURI: string): Promise<boolean> {
	const isPresent = await GreedDataSource.getRepository(Queue).find({
		where: {
			torrentId: `${magnetURI}`,
		},
	});

	console.log("VERIFIED AND ITS DUPLICATED!@!!: ", isPresent);

	if (isPresent) {
		return true;
	}

	return false;
}

export async function removeFromQueue(magnetURI: string) {
	await GreedDataSource.getRepository(Queue).delete({
		torrentId: magnetURI,
	});
}

export async function syncronizeQueue(): Promise<Queue[]> {
	return await GreedDataSource.getRepository(Queue).find({
		where: {
			status: "paused",
		},
	});
}
