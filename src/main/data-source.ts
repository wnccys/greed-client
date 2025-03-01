import "reflect-metadata";
import { DataSource } from "typeorm";
import { GreedSettings } from "./model/entity/Settings";
import { Sources } from "./model/entity/Sources";
import { Downloads } from "./model/entity/Downloads";
import { SteamGames } from "./model/entity/SteamGames";
import { GamePath } from "./model/entity/GamePath";
import { Queue } from "./model/entity/Queue";

export const GreedDataSource = new DataSource({
	type: "better-sqlite3",
	database: "./src/db/settings.sqlite",
	synchronize: true,
	logging: false,
	entities: [GreedSettings, Sources, Downloads, SteamGames, GamePath, Queue],
	migrations: ["./src/main/migrations/*.ts"],
	subscribers: [],
});
