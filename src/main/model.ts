// TODO set @main to /src/main

import { AppDataSource } from "./data-source"
import { GreedSettings } from "./entity/Settings"

export function testDBConn() {
    AppDataSource.initialize().then(async () => {
        // console.log("Inserting a new settings into the database...")
        // const settings = new GreedSettings();
        // settings.username = "WINDOWS 11";
        // settings.sources = "FitGirl";
        // await AppDataSource.manager.save(settings);
        // console.log(`Saved a new settings with id: ${settings.id}`);

        console.log("Loading settings from the database...");
        const settingsData = await AppDataSource.manager.find(GreedSettings);
        console.log("Loaded settings: ", settingsData);
    }).catch(error => console.log(error))
}