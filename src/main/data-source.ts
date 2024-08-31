import "reflect-metadata"
import { DataSource } from "typeorm"
import { GreedSettings } from "./entity/Settings"
import { Sources } from "./entity/Sources"
import { Downloads } from "./entity/Downloads"
import { SteamGames } from "./entity/SteamGames"
import { GamePath } from "./entity/GamePath"

export const GreedDataSource = new DataSource({
    type: "sqlite",
    database: "./src/db/settings.sqlite",
    synchronize: true,
    logging: false,
    entities: [GreedSettings, Sources, Downloads, SteamGames, GamePath],
    migrations: ["./src/main/migrations/*.ts"],
    subscribers: [],
})
