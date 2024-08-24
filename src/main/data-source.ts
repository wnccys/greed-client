import "reflect-metadata"
import { DataSource } from "typeorm"
import { GreedSettings } from "./entity/Settings"
import { Sources } from "./entity/Sources"
import { Downloads } from "./entity/Downloads"

export const GreedDataSource = new DataSource({
    type: "sqlite",
    database: "./src/db/settings.sqlite",
    synchronize: true,
    logging: false,
    entities: [GreedSettings, Sources, Downloads],
    migrations: ["./src/main/migrations/*.ts"],
    subscribers: [],
})
