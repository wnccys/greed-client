import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class GamePath {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	gameName: string;

	@Column()
	steamId: number;

	@Column()
	execPath: string;

	@Column({ type: "text", nullable: true })
	icon: string | null;

	@Column({ type: "simple-array", nullable: true })
	uris: string[] | null;
}
