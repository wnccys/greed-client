import { GreedDataSource } from "@main/data-source";
import { Downloads } from "./entity/Downloads";
import { SteamGames } from "./entity/SteamGames";
import { Like } from "typeorm";

/**
 * This function is primarily used for retrieve game's information from Database with a steamId-based approach,
 */
export async function getDBGameInfos(gameId: number) {
	return await GreedDataSource.getRepository(Downloads).findBy({
		steamId: gameId,
	});
}

/**
 * Return a list of Games fom SteamGames model.
 */
export const getDBGamesByName = async (name: string) => {
	return await GreedDataSource.getRepository(SteamGames).find({
		where: {
			name: Like(`${name}%`),
		},
		take: 20,
	});
};

/**
 * Get 20 games from SteamGames model starting as index.
 * Primarily used for catalog pagination;
 */
export type Direction = 'BACKWARD' | 'FORWARD';

export const getGamesRange = async (lastId: number, direction: Direction) => {
    const query = GreedDataSource.getRepository(SteamGames)
		.createQueryBuilder("game")
		.take(20);

    if (direction === 'BACKWARD') {
        query.where("game.appid < :lastId", { lastId })
            .orderBy("game.appid", "DESC");
    } else {
        query.where("game.appid > :lastId", { lastId })
            .orderBy("game.appid", "ASC");
    }

    const games = await query.getMany();

    return direction === 'BACKWARD' ? games.reverse() : games;
};