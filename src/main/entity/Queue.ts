import { Entity, PrimaryColumn, Column } from "typeorm";

@Entity()
export class Queue {
    @PrimaryColumn()
    torrentId: number

    @Column()
    status: 'paused' | 'downloading'
}