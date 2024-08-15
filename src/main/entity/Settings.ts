import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class GreedSettings {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    username: string
}