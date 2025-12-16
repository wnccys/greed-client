import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class SteamGames {
	@PrimaryGeneratedColumn()
	appid: number;

	@Column()
	name: string;
}
