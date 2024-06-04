import { randomUUID } from 'crypto';
import { connections } from '.';

export const handleNewSocket = (socket) => {
    const connectionId = randomUUID();
    connections.set(connectionId, socket);

    socket.on('close', () => {
    });

    socket.on('data', (data) => {
    });
};
