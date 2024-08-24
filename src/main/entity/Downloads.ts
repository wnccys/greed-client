import { Entity, Column, PrimaryColumn } from "typeorm"

@Entity()
export class Downloads {

    @PrimaryColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    normalizedTitle: string;

    @Column({ type: 'simple-array' })
    uris: string[];

    @Column()
    uploadDate: string;

    @Column()
    fileSize: string;
}