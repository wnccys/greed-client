import { Encoding } from "crypto";


export class Torrent {
_name: string;
_isPrivate: boolean;
_fileObj: File[];
_fileDirectory: string;
_downloadDirectory: string;
_trackers: Tracker[];
_comment: string;
_createdBy: string;
_creationDate: Date;
_encoding: Encoding; //hash
_pieceSize: number;
_pieceHash: number[][];

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