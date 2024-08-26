import { Entity, PrimaryGeneratedColumn, Column, PrimaryColumn } from "typeorm"


@Entity()
export class GameId {

@PrimaryColumn()
id: number;

@Column()
title: string;

@Column()
uri: string;


@Column()
date: string;

@Column()
file: string;



}