import "reflect-metadata";
import { DataSource } from "typeorm";
import { GreedSettings } from "./entity/Settings";
import { Sources } from "./entity/Sources";
import { Downloads } from "./entity/Downloads";
import { SteamGames } from "./entity/SteamGames";
import { GamePath } from "./entity/GamePath";
import { Queue } from "./entity/Queue";

export const GreedDataSource = new DataSource({
	type: "better-sqlite3",
	database: "./src/db/settings.sqlite",
	synchronize: true,
	logging: false,
	entities: [GreedSettings, Sources, Downloads, SteamGames, GamePath, Queue],
	migrations: ["./src/main/migrations/*.ts"],
	subscribers: [],
});
