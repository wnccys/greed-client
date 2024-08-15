import "reflect-metadata"
import { DataSource } from "typeorm"
import { Settings } from "./entity/Settings"

export const AppDataSource = new DataSource({
    type: "sqlite",
    database: "./src/db/settings.sqlite",
    synchronize: true,
    logging: false,
    entities: [Settings],
    migrations: [],
    subscribers: [],
})
