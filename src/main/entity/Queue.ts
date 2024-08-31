import { Entity, PrimaryColumn, Column } from "typeorm";

@Entity()
export class Queue {
    @PrimaryGeneratedColumn()
    id: number
}