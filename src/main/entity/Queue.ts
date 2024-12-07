import { Entity, PrimaryColumn, Column } from "typeorm";

@Entity()
export class Queue {
	@PrimaryColumn()
	torrentId: string;

	@Column()
	name: string;

	@Column()
	progress: number;

	@Column()
	size: string;

	@Column()
	status: "paused" | "downloading";
}
