const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, 'settings.sqlite');
const filePath = path.join(__dirname, 'output.json');

if (!fs.existsSync(dbPath)) {
    console.error('O banco de dados não existe:', dbPath);
    process.exit(1); 
}

const db = new sqlite3.Database(dbPath);

db.serialize(() => {
    const data = fs.readFileSync(filePath, 'utf-8');
    let parsedData;

    try {
        parsedData = JSON.parse(data);

        if (!parsedData.downloads || !Array.isArray(parsedData.downloads)) {
            throw new Error('O campo downloads não é um array ou não existe.');
        }
    } catch (err) {
        console.error('Erro ao analisar JSON:', err.message);
        return;
    }

    const name = parsedData.name || 'Unknown'; 
    const downloads = JSON.stringify(parsedData.downloads); 

    const stmt = db.prepare(`
        INSERT INTO sources (id, name, downloads)
        VALUES (?, ?, ?)
    `);

   
    stmt.run(null, name, downloads, (err) => {
        if (err) {
            console.error('Erro ao inserir dados:', err.message);
        }
    });

    stmt.finalize();

    db.each("SELECT id, name, downloads FROM sources", (err, row) => {
        if (err) {
            console.error('Erro:', err.message);
        } else {
            console.log(`ID: ${row.id}, Name: ${row.name}, Downloads: ${row.downloads}`);
        }
    });

    db.close();
});
