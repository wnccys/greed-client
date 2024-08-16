import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class Sources {

    @PrimaryGeneratedColumn()
    id: number

    @Column({ unique: true })
    name: string;

    @Column()
    downloads: string;

    @Column()
    downloadsCount: number;
}