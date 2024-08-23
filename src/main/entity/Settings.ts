import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert } from "typeorm"
import { hostname } from "node:os";

@Entity()
export class GreedSettings {

    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: 'varchar', nullable: true })
    username: string | null 

    @Column()
    downloadPath: string
}