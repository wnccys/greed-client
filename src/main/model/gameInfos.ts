import { GreedDataSource } from "@main/data-source";
import { Downloads } from "./entity/Downloads";
import { throttle } from "lodash-es";
import { SteamGames } from "./entity/SteamGames";
import { Like } from "typeorm";

export async function getDBGameInfos(gameId: number) {
	return await GreedDataSource.getRepository(Downloads).findBy({
		steamId: gameId,
	});
}

export const getDBGamesByName = throttle(async (name: string) => {
	return await GreedDataSource.getRepository(SteamGames).find({
		where: {
			name: Like(`${name}%`),
		},
		take: 20,
	});
}, 100);

export const getGamesRange = async (index: number) => {
	return GreedDataSource.getRepository(SteamGames)
		.createQueryBuilder()
		.offset(index)
		.take(index + 20)
		.getMany();
};
