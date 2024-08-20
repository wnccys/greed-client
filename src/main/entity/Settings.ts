import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"
import { hostname } from "node:os";

@Entity()
export class GreedSettings {

    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: 'varchar', default: true })
    username: string = hostname(); 

    @Column()
    downloadPath: string
}