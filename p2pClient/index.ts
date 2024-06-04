import { randomUUID } from 'crypto';
import * as net from 'net';
import { EventEmitter } from 'events';

module.exports = (options: any) => {
    // starts node
    return () => {
        // stops node
    }
}

const connections = new Map;
const emitter = new EventEmitter();

const send = (connectionId: String, message: String) => {
    const socket = connections.get(connectionId);

    if (!socket) {
        throw new Error(`Attempt to send data to connection that does not exist ${connectionId}`);
    }

    socket.write(JSON.stringify(message));
}

// REVIEW: set correct types to params;
const connect = (ip, port, cb) => {
    const socket = new net.Socket();

    socket.connect(port, ip, () => {
        handleNewSocket(socket);
        cb();
    });
}

const handleNewSocket = (socket: net.Socket) => {
    const connectionId = randomUUID();
    connections.set(connectionId, socket);

    socket.on('close', () => {
        connections.delete(connectionId);
        emitter.emit('disconnect', connectionId);
    });

    socket.on('data', (data: any) => {
        try {
            emitter.emit('message', { connectionId, message: JSON.parse(data.toString()) });
        } catch(err) {
            console.error(err);
        }
    });
}

const server = net.createServer((socket: net.Socket) => {
    handleNewSocket(socket);
});