const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, 'linksjsondb.db');
const filePath = path.join(__dirname, 'output.json');


if (!fs.existsSync(dbPath)) {
    console.error('O banco de dados n existe:', dbPath);
    process.exit(1); 
}
const db = new sqlite3.Database(dbPath);


db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS games (
            id INTEGER PRIMARY KEY,
            title TEXT NOT NULL,
            uri TEXT NOT NULL,
            date TEXT NOT NULL,
            file TEXT NOT NULL
        )
    `);

    const data = fs.readFileSync(filePath, 'utf-8');
    let parsedData;

    try {
        parsedData = JSON.parse(data);

        if (!parsedData.downloads || !Array.isArray(parsedData.downloads)) {
            throw new Error('The downloads field is not an array or does not exist.');
        }
    } catch (err) {
        console.error('Error parsing JSON:', err.message);
        return;
    }

    const downloads = parsedData.downloads;

    const stmt = db.prepare(`
        INSERT INTO games (id, title, uri, date, file)
        VALUES (?, ?, ?, ?, ?)
    `);

    
    downloads.forEach(download => {
        const id = download.id || null; 
        const title = download.title;
        const uri = download.uris && download.uris.length > 0 ? download.uris[0] : null; 
        const date = download.uploadDate;
        const fileSize = download.fileSize;

        if (id !== null && title && uri && date && fileSize) {
            stmt.run(id, title, uri, date, fileSize, (err) => {
                if (err) {
                    console.error('Error inserting data:', err.message);
                }
            });
        } else {
            console.warn('Skipping entry due to missing required fields:', { id, title, uri, date, fileSize });
        }
    });

    stmt.finalize();

    db.each("SELECT id, title, uri, date, file FROM games", (err, row) => {
        if (err) {
            console.error('Error:', err.message);
        } else {
            console.log(`${row.id}: ${row.title}, ${row.uri}, ${row.date}, ${row.file}`);
        }
    });
});

db.close();
