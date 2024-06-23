import * as readline from 'readline';
import * as fs from 'fs';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Digite o caminho do arquivo: ', (filePath) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Erro ao ler o arquivo:', err);
            rl.close();
            return;
        }

        console.log('Conteúdo do arquivo:', data);
        rl.close();
    });
});
