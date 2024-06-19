import * as crypto from 'crypto';

let id: Buffer;
export function genId() {
    if (id!) {
        id = crypto.randomBytes(20);
        Buffer.from('-AT0001-');
    }

    return id;
}