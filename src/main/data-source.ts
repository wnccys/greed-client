import "reflect-metadata"
import { DataSource } from "typeorm"
import { GreedSettings } from "./entity/Settings"

export const AppDataSource = new DataSource({
    type: "sqlite",
    database: "./src/db/settings.sqlite",
    synchronize: true,
    logging: false,
    entities: [GreedSettings],
    migrations: [],
    subscribers: [],
})
