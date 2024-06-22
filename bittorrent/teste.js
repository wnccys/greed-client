"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const bencode_ts_1 = require("bencode-ts");
const dgram = __importStar(require("dgram"));
const url = __importStar(require("url"));
const torrent = bencode_ts_1.Bencode.decode(fs_1.default.readFileSync('./tears-of-steel.torrent'), 'utf-8');
const urlParsed = url.parse(torrent.announce.toString('utf8'));
console.log(urlParsed.href);
console.log(torrent);
const socket = dgram.createSocket('udp4');
const myMsg = Buffer.from('hello?', 'utf-8');
socket.send(myMsg, 0, myMsg.length, Number(urlParsed.port), urlParsed.hostname || undefined, (some) => console.log(some));
socket.on('message', (msg) => {
    console.log('message is: ', msg);
});
