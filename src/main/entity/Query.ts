import { SqliteConnectionOptions } from 'typeorm/driver/sqlite/SqliteConnectionOptions';
import path from 'path';
import fetch from 'node-fetch';

const sqlite3Path = path.join(__dirname,"/src/db/sqlite3.exe");
const db = new sqlite3.Database(__dirname,'/src/db/cu.db');

const query = `
CREATE TABLE IF NOT EXISTS json_test (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    downloads TEXT
);`;

const fetchData = async () => {

    try {
        consat response = await fetch("https://hydralinks.cloud/sources/fitgirl.json");
        const jsonData = await response.json();

            jsonData.forEach( (element) => { 
                const query = `INSERT INTO json_test (name, downloads) VALUES (?,?)  `
                const array = [element.name, element.downloads] 
               
            }); 

    }
}





