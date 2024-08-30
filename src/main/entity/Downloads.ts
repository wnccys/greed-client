import { Entity, Column, PrimaryGeneratedColumn} from "typeorm"

@Entity()
export class Downloads {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    sourceId: number;

    @Column()
    title: string;

    @Column("int", { nullable: true })
    steamId: number | null;

    @Column({ type: 'simple-array' })
    uris: string[];

    @Column()
    uploadDate: string;

    @Column()
    fileSize: string;
}