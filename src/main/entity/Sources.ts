import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class Sources {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    downloads: string 
}