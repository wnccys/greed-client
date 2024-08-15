// TODO set @main to /src/main

import { GreedDataSource } from "./data-source"
import { GreedSettings } from "./entity/Settings"
import { Sources } from "./entity/Sources"

export function testDBConn() {
    GreedDataSource.initialize().then(async () => {
        console.log("Loading settings and sources from the database...");
        const settingsData = await GreedDataSource.manager.find(GreedSettings);
        console.log("Loaded settings: ", settingsData);
        const sourceData = await GreedDataSource.manager.find(Sources);

        for (const source of sourceData) {
            console.log(JSON.stringify(source.sources));
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
    newSource.sources = receivedSource;

    await GreedDataSource.manager.save(newSource);
    const sourceData = await GreedDataSource.manager.find(Sources);
    console.log("source added: ", sourceData);
}