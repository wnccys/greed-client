// TODO set @main to /src/main

import { GreedDataSource } from "./data-source"
import { GreedSettings } from "./entity/Settings"
import { Sources } from "./entity/Sources"

export function testDBConn() {
    GreedDataSource.initialize().then(async () => {
        // console.log("Inserting a new settings into the database...")
        // const settings = new GreedSettings();
        // settings.username = "WINDOWS 11";
        // settings.sources = "FitGirl";
        // await AppDataSource.manager.save(settings);
        // console.log(`Saved a new settings with id: ${settings.id}`);

        console.log("Loading settings and sources from the database...");
        const settingsData = await GreedDataSource.manager.find(GreedSettings);
        console.log("Loaded settings: ", settingsData);
        const sourceData = await GreedDataSource.manager.find(Sources);

        for (const source of sourceData) {
            console.log(source.sources.toString());
        }
    }).catch(error => console.log(error))
}

export type GameSource = {
    title: string,
    downloads: {
        title: string,
        uris: string[],
        uploadDate: string,
        fileSize: string,
    }[];
}

export async function addGameSource(receivedSource: string) {
    const newSource = new Sources();

    newSource.sources = JSON.parse(receivedSource);

    await GreedDataSource.manager.save(newSource);
    const sourceData = await GreedDataSource.manager.find(Sources);
    console.log("source added: ", sourceData);
}