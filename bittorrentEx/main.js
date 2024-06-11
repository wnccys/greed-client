"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const bencode_1 = __importDefault(require("bencode"));
const torrent = bencode_1.default.decode(fs_1.default.readFileSync('puppy.torrent'));
console.log(torrent.announce.toString('utf-8'));
