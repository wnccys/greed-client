import {Buffer} from 'node:buffer';

const buff = Buffer.from('ZipZip', 'utf8');

console.log(buff.toString('hex'));//formato hexa decimal

console.log(buff.toString('base64')); //formato de texto



