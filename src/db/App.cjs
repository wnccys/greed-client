const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const path = require('path');

const db = new sqlite3.Database('./linksjsondb.db');
const filePath = path.join(__dirname, '/fitgirl.txt');

db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS download (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            title TEXT NOT NULL,
            uri TEXT NOT NULL,
            date TEXT NOT NULL,
            file TEXT NOT NULL
        )
    `);

    const data = fs.readFileSync(filePath, 'utf-8');

    let parsedData;
    try {
        parsedData = 
                    JSON.parse(data);

        if (!parsedData.downloads || !Array.isArray(parsedData.downloads)) {
            throw new Error('the downloads field its not a array or not exists');
        }
    } catch (err) {
        console.error('error to parser json:', err.message);
        return;
    }

    const name = parsedData.name;
    const downloads = parsedData.downloads;

    const stmt = db.prepare(`
        INSERT INTO download (name, title, uri, date, file)
        VALUES (?, ?, ?, ?, ?)
    `);

    downloads.forEach(download => {
        const title = download.title;
        const uri = download.uris[0]; 
        const date = download.uploadDate;
        const fileSize = download.fileSize;

        stmt.run(name, title, uri, date, fileSize);
    });

    stmt.finalize();

    db.each("SELECT id, name, title, uri, date, file FROM download", (err, row) => {
        if (err) {
            console.error('error', err.message);
        } else {
            console.log(`${row.id}: ${row.name}, ${row.title}, ${row.uri}, ${row.date}, ${row.file}`);
        }
    });
});

db.close();
