import { MigrationInterface, QueryRunner } from "typeorm";
import gameData from "src/db/steam-games.json";

interface Game {
    id: number;
    name: string;
    clientIcon: string;
    uri?: string; // Adiciona a URI opcionalmente
}

const gamesData: Game[] = gameData as Game[];

async function updateGamesWithUri(queryRunner: QueryRunner, games: Game[]): Promise<Game[]> {
    const updatedGames = [...games]; // Copia o array original de jogos

    for (const game of updatedGames) {
        const result = await queryRunner.query(
            `SELECT uri FROM games WHERE id = ?`,
            [game.id]
        );

        if (result.length > 0) {
            game.uri = result[0].uri; // Adiciona a URI ao jogo
        } else {
            game.uri = ""; // Opcional: Define como null se não encontrar
        }
    }
    console.log(updatedGames)
    return updatedGames;
    
}

export class PostRefactoringTIMESTAMP implements MigrationInterface {
    async up(queryRunner: QueryRunner): Promise<void> {
        const updatedGames = await updateGamesWithUri(queryRunner, gamesData);

        // Log dos jogos atualizados para verificação
        console.log('Jogos atualizados com URI:', updatedGames);
    }

    async down(queryRunner: QueryRunner): Promise<void> {
        // Não faz nada para reverter neste exemplo
    }

   
}