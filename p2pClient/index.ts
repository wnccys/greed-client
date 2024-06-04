import { randomUUID } from 'crypto';
import * as net from 'net';
import { EventEmitter } from 'events';

module.exports = (options) => {
    // starts node
    return () => {
        // stops node
    }
}

const connections = new Map;
const emitter = new EventEmitter();

const handleNewSocket = (socket) => {
    const connectionId = randomUUID();
    connections.set(connectionId, socket);

    socket.on('close', () => {
        connections.delete(connectionId);
        emitter.emit('disconnect', connectionId);
    });

    socket.on('data', (data) => {
        try {
            emitter.emit('message', { connectionId, message: JSON.parse(data.toString()) });
        } catch(err) {
            console.error(err);
        }
    });
}

const server = net.createServer((socket) => {
    handleNewSocket(socket);
});