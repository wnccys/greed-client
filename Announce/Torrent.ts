import { Encoding } from "crypto";


export class Torrent {
    private _name: string;
    private _isPrivate: boolean;
    private _fileObj: File[];
    private _fileDirectory: string;
    private _downloadDirectory: string;
    private _trackers: Tracker[];
    private _comment: string;
    private _createdBy: string;
    private _creationDate: Date;
    private _encoding: Encoding; //hash
    private _blockSize: number;
    private _pieceSize: number;
    private _pieceHash: number[][];

    constructor() {
        this._pieceHash = [];
    }

    get name(): string {
        return this._name;
    }

    get isPrivate(): boolean {
        return this._isPrivate;
    }

    get FileObj(): File[] {
        return this._fileObj;
    }

    get FileDirectory(): string {
        return this._fileDirectory;
    }

    get DownloadDirectory(): string {
        return this._downloadDirectory;
    }

    get trackers(): Tracker[] {
        return this._trackers;
    }

    get comment(): string {
        return this._comment;
    }

    get createdBy(): string {
        return this._createdBy;
    }

    get creationDate(): Date {
        return this._creationDate;
    }

    get encoding(): Encoding {
        return this._encoding;
    }

    get blockSize(): number {
        return this._blockSize;
    }

    get pieceSize(): number {
        return this._pieceSize;
    }

    get pieceHash(): number[][] {
        return this._pieceHash;
    }
}