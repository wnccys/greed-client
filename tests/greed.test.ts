import type { DataSource } from 'typeorm';
import { GreedDataSource } from '../src/main/data-source';

describe("SQLite3 Connection", () => {
    let dataSource: DataSource;

    beforeAll(async () => {
        dataSource = await GreedDataSource.initialize();
    });

    afterAll(async () => {
        if (dataSource?.isInitialized) {
            await dataSource.destroy();
        }
    })

    it('should connect to Database', async () => {
        expect(dataSource.isInitialized).toBe(true);
    });
});