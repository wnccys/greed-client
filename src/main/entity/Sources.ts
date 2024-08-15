import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"
import type { GameSource } from "@main/model"

@Entity()
export class Sources {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    sources: string 
}