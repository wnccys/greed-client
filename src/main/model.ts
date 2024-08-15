// TODO set @main to /src/main

import { AppDataSource } from "./data-source"
import { Settings } from "./entity/Settings"

AppDataSource.initialize().then(async () => {

    console.log("Inserting a new settings into the database...")
    const settings = new Settings();
    settings.firstName = "Timber";
    settings.lastName = "Saw";
    settings.age = 25;
    await AppDataSource.manager.save(settings);
    console.log(`Saved a new settings with id: ${settings.id}`);

    console.log("Loading settings from the database...");
    const settingsData = await AppDataSource.manager.find(Settings);
    console.log("Loaded settings: ", settingsData);

    console.log("Here you can setup and run express / fastify / any other framework.");

}).catch(error => console.log(error))