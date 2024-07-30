"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var readline = require("readline");
var fs = require("fs");
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
rl.question('Digite o caminho do arquivo: ', function (filePath) {
    fs.readFile(filePath, 'utf8', function (err, data) {
        if (err) {
            console.error('Erro ao ler o arquivo:', err);
            rl.close();
            return;
        }
        console.log('Conteúdo do arquivo:', data);
        rl.close();
    });
});
