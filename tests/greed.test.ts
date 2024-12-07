import { describe, it } from "node:test";
import fs from "node:fs";
import path from "node:path";

describe("Check for DB file integrity.", async () => {
	it("should be present.", async () => {
		if (fs.existsSync(path.resolve("./src/db/settings.sqlite"))) {
			return;
		}
		throw Error(
			`Could Not Find Database File at ${path.resolve("./src/db/settings.sqlite")}`,
		);
	});
});
