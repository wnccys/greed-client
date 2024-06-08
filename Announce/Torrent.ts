class Torrent {
    private _name: string;
    private _isPrivate: boolean;
    private _fileObj: File[];
    private _fileDirectory: string;
    private _downloadDirectory: string;









    

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }

    get isPrivate(): boolean {
        return this._isPrivate;
    }

    set isPrivate(value: boolean) {
        this._isPrivate = value;
    }

    get FileObj(): File[] {
        return this._fileObj;
    }

    set FileObj(value: File[]) {
        this._fileObj = value;
    }

    get FileDirectory(): string {
        return this._fileDirectory;
    }

    set FileDirectory(value: string) {
        this._fileDirectory = value;
    }

    get DownloadDirectory(): string {
        return this._downloadDirectory;
    }

    set DownloadDirectory(value: string) {
        this._downloadDirectory = value;
    }
}

