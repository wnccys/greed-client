import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"


@Entity()
export class Games {

@Column()
title: string;

@Column()
uploadDate: string;

@Column()
fileSize: string;

@PrimaryGeneratedColumn()
id: number;

}