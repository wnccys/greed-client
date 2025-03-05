import type { JSONGame } from "@main/worker";

export interface Source {
	name: string;
	downloads: JSONGame[];
}