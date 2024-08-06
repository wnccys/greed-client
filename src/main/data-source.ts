import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "@main/entity/User"

export const AppDataSource = new DataSource({
    type: "sqlite",
    database: "./src/db/cu.sqlite",
    synchronize: true,
    logging: false,
    entities: [User],
    migrations: [],
    subscribers: [],
})
