import { Entity, Column, PrimaryGeneratedColumn} from "typeorm"

@Entity()
export class Downloads {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    sourceId: number;

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