/* import fs from 'fs';

async function run() {


  try {
    const torrent = (fs.readFileSync('660725.torrent'));
    console.log(torrent.toString('utf8'));
  } catch (err) {
    console.error('Erro ao ler o arquivo:', err);
  }
}

run(); código buffer sem serializaçao de bencode */
import fs from 'fs';
async function run() {
    const { default: bencode } = await import('bencode');
    try {
        const torrent = bencode.decode(fs.readFileSync('660725.torrent'));
        const asciiArray = torrent.announce;
        const url = String.fromCharCode(...asciiArray);
        console.log(url);
    }
    catch (err) {
        console.error('Erro ao ler o arquivo:', err);
    }
}
run(); //buffer com serialização de bencode
