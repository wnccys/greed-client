import { Entity, PrimaryColumn, Column } from "typeorm";

@Entity()
export class Queue {
    @PrimaryColumn()
    torrentId: string 

    @Column()
    name: string

    @Column()
    size: string 

    @Column()
    status: 'paused' | 'downloading'
}