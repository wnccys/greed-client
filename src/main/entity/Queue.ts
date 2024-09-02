import { Entity, PrimaryColumn, Column } from "typeorm";

@Entity()
export class Queue {
    @PrimaryColumn()
    torrentId: string 

    @Column()
    status: 'paused' | 'downloading'
}