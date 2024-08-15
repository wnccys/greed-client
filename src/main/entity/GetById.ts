import fs from 'fs';
import path from 'path';

interface Download {
    title: string;
    uris: string[];
    uploadDate: string;
    fileSize: string;
}

interface DataJson1 {
    name: string;
    downloads: Download[];
}

interface DataJson2 {
    id: number;
    name: string;
    clientIcon: string;
}

export class GetById {
    private static limpaTitle(title: string): string {
        const match = title.match(/^(.*?)(?:\s*\(v[\d\.]+\))?/);
        return match ? match[1].trim() : title;
    }

    public static getbyid() {
        console.log('Iniciando a leitura dos arquivos JSON');
    
        const json1Path = path.join(__dirname, 'fitgirl.txt');
        const json2Path = path.join(__dirname, 'steam-games.json');
        const outputPath = path.join(__dirname, 'src', 'db', 'updated_json1.json');
    
        const dataJson1: DataJson1 = JSON.parse(fs.readFileSync(json1Path, 'utf-8'));
        console.log('Fitgirl JSON carregado', dataJson1);
    
        const dataJson2: DataJson2[] = JSON.parse(fs.readFileSync(json2Path, 'utf-8'));
        console.log('Steam JSON carregado', dataJson2);
    
        const idMap = new Map<string, number>();
        for (const item of dataJson2) {
            idMap.set(this.limpaTitle(item.name), item.id);
        }
        console.log('ID Map criado', idMap);
    
        const updatedDownloads = dataJson1.downloads.map((item) => {
            const cleanTitleName = this.limpaTitle(item.title);
            const id = idMap.get(cleanTitleName);
            return {
                ...item,
                id: id || null 
            };
        });
        console.log('Downloads atualizados', updatedDownloads);
    
        const updatedJson1 = {
            name: dataJson1.name,
            downloads: updatedDownloads
        };
    
        fs.writeFileSync(outputPath, JSON.stringify(updatedJson1, null, 2), 'utf-8');
        console.log(`Novo JSON salvo em ${outputPath}`);
    }
    
}
