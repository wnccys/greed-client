import type { MigrationInterface, QueryRunner } from "typeorm";
import { hostname } from "node:os";
import path from "node:path";

export class InitSettings1724190462678 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		queryRunner.query(
			"INSERT INTO greed_settings (username, downloadPath) VALUES (?, ?)",
			[hostname(), path.resolve("./src/downloads")],
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {}
}
