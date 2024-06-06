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
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = require("crypto");
const net = __importStar(require("net"));
const events_1 = require("events");
module.exports = (options) => {
    const connections = new Map;
    const emitter = new events_1.EventEmitter();
    // sets object events on new created socket 
    // functions: server and connect.
    const handleNewSocket = (socket) => {
        const connectionId = (0, crypto_1.randomUUID)();
        connections.set(connectionId, socket);
        socket.on('close', () => {
            connections.delete(connectionId);
            emitter.emit('disconnect', connectionId);
        });
        socket.on('data', (data) => {
            try {
                emitter.emit('message', { connectionId, message: JSON.parse(data.toString()) });
            }
            catch (err) {
                throw new Error(`Error: ${err}`);
            }
        });
    };
    // selects target socket by connectionId and 
    // sends chosen message to it.
    const send = (connectionId, message) => {
        const socket = connections.get(connectionId);
        if (!socket) {
            throw new Error(`Attempt to send data to connection that does not exist ${connectionId}`);
        }
        socket.write(JSON.stringify(message));
    };
    // connects socket with given ip and port server.
    const connect = (ip, port, cb) => {
        const socket = new net.Socket();
        socket.connect(port, ip, () => {
            handleNewSocket(socket);
            cb();
        });
    };
    const server = net.createServer((socket) => {
        handleNewSocket(socket);
    });
    server.listen(options.port, '0.0.0.0');
    // unique id for each new node created.
    const NODE_ID = (0, crypto_1.randomUUID)();
    const neighbors = new Map();
    // adds connect function with connectionId (set by user on event call: 
    // ex. client.emit('connection', "213123")) to any emitter object
    // to interact with socket instance.
    emitter.on('connect', (connectionId) => {
        send(connectionId, { type: 'handshake', data: { nodeId: NODE_ID } });
    });
    emitter.on('message', ({ connectionId, message }) => {
        const { type, data } = message;
        if (type === 'handshake') {
            const { nodeId } = data;
            neighbors.set(nodeId, connectionId);
            emitter.emit('node-connect', { nodeId });
        }
        if (type === 'message') {
            const nodeId = findNodeId(connectionId);
            if (!nodeId) {
                throw new Error("Couldn't find receiver id.");
            }
            emitter.emit('node-message', { nodeId, data });
        }
    });
    const nodesend = (nodeId, data) => {
        const connectionId = neighbors.get(nodeId);
        if (!connectionId) {
            throw new Error("Couldn't determine connectionId");
        }
        send(connectionId, { type: 'message', data });
    };
    const findNodeId = (connectionId) => {
        for (let [nodeId, $connectionId] of neighbors) {
            if (connectionId = $connectionId) {
                return nodeId;
            }
        }
    };
    // REVIEW set correct message type/struct
    const p2psend = (data) => {
        if (data.ttl < 1) {
            return;
        }
        for (const $nodeId of neighbors.keys()) {
            nodesend($nodeId, data);
            alreadySeenMessages.add(data.id);
        }
    };
    const broadcast = (message, id = (0, crypto_1.randomUUID)(), origin = NODE_ID, ttl = 1000) => {
        p2psend({ id, ttl, type: 'broadcast', message, origin });
    };
    const dm = (destination, message, origin = NODE_ID, ttl = 10, id = (0, crypto_1.randomUUID)()) => {
        p2psend({ id, ttl, type: 'dm', message, destination, origin });
    };
    emitter.on('delete', (connectionId) => {
        const nodeId = findNodeId(connectionId);
        if (!nodeId) {
            return console.error("error shut");
        }
        neighbors.delete(nodeId);
        emitter.emit('node-disconnect', { nodeId });
    });
    const alreadySeenMessages = new Set();
    emitter.on('node-message', ({ nodeId, data }) => {
        if (!alreadySeenMessages.has(data.id)) {
            if (data.type === 'broadcast') {
                emitter.emit('broadcast', { message: data.message, origin: data.origin });
                broadcast(data.message, data.id, data.origin, data.ttl - 1);
            }
            if (data.type === 'dm') {
                if (data.destination === NODE_ID) {
                    emitter.emit('dm', { origin: data.origin, message: data.message });
                }
                else {
                    dm(data.destination, data.message, data.origin, data.ttl - 1, data.id);
                }
            }
        }
    });
    // returns
    return {
        broadcast, dm, on: emitter.on, connect,
        close: () => {
            server.close();
        },
    };
};
