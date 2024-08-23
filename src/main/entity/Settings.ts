import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class GreedSettings {

    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: 'varchar', nullable: true })
    username: string | null 

    @Column()
    downloadPath: string
}