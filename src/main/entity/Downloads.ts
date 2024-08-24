import { Entity, Column, PrimaryColumn } from "typeorm"

@Entity()
export class Downloads {

    @PrimaryColumn()
    id: number;

    @Column()
    title: string;

    @Column({ type: 'simple-json' })
    uris: unknown;

    @Column()
    uploadData: string;

    @Column()
    fileSize: string;
}