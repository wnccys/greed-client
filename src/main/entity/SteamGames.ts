import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class SteamGames {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string;
}