import { describe, it } from 'node:test';
import fs from 'fs';
import path from 'node:path';

describe("Check for DB file integrity.", async () => {
    it("should be present.", async () => {
        if (fs.existsSync(path.resolve("./src/db/settings.sqlite"))) {
            return;
        }; 
        console.error("resolved path: ", path.resolve("./src/db/settings.sqlite"));
        throw Error("Could Not Find Database File at " + path.resolve("./src/db/settings.sqlite"));
    })
});