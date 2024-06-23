import * as fs from 'fs';
import { Bencode} from 'bencode-ts';

try {
    const torrent = Bencode.decode(fs.readFileSync('660725.torrent'));
    console.log(torrent.announce.toString()); // URL do rastreador
    console.log(torrent['info']['name'].toString()); // Nome do arquivo
    console.log(torrent['info']['piece length']); // Tamanho das partes
} catch (err) {
    console.error('Erro ao ler o arquivo:', err);
}
