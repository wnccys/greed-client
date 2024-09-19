import { describe, it } from 'node:test';
import fs from 'fs';

describe("Check for DB file integrity.", async () => {
    it("should be present.", async () => {
        if (fs.existsSync("./src/db/settings.sqlite")) {
            return;
        }; 

        throw Error("Could Not Find DB");
    })
});