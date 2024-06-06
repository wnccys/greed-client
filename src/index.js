"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_buffer_1 = require("node:buffer");
const buff = node_buffer_1.Buffer.from('ZipZip', 'utf8');
console.log(buff.toString('hex')); //formato hexa decimal
console.log(buff.toString('base64')); //formato de texto
