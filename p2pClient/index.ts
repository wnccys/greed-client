import { randomUUID } from 'crypto';
import * as net from 'net';
import { EventEmitter } from 'events';

module.exports = (options: any) => {

const connections = new Map;
const emitter = new EventEmitter();

// sets object events on new created socket 
// functions: server and connect.
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
            throw new Error(`Error: ${err}`);
        }
    });
}

// selects target socket by connectionId and 
// sends chosen message to it.
const send = (connectionId: String, message: Object) => {
    const socket = connections.get(connectionId);

    if (!socket) {
        throw new Error(`Attempt to send data to connection that does not exist ${connectionId}`);
    }

    socket.write(JSON.stringify(message)); 
}

// connects socket with given ip and port server.
const connect = (ip: string, port: number, cb: Function) => {
    const socket = new net.Socket();

    socket.connect(port, ip, () => {
        handleNewSocket(socket);
        cb();
    });
}

const server = net.createServer((socket: net.Socket) => {
    handleNewSocket(socket);
});

server.listen(options.port, '0.0.0.0');

// unique id for each new node created.
const NODE_ID = randomUUID();
const neighbors = new Map();

// adds connect function with connectionId (set by user on event call: ex. client.emit('connection', "213123")) to any emitter object
// to interact with server instance.
emitter.on('connect', (connectionId) => {
    send(connectionId, { type: 'handshake', data: { nodeId: NODE_ID} } );
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

const nodesend = (nodeId: String, data: Object) => {
    const connectionId = neighbors.get(nodeId);

    if (!connectionId) {
        throw new Error("Couldn't determine connectionId");
    }

    send(connectionId, { type: 'message', data });
};

const findNodeId = (connectionId: String) => {
    for (let [nodeId, $connectionId] of neighbors) {
        if (connectionId = $connectionId) {
            return nodeId;
        }
    }    
}

// REVIEW set correct message type/struct
const p2psend = (data: any) => {
    if (data.ttl < 1) {
        return;
    }

    for (const $nodeId of neighbors.keys()) {
        nodesend($nodeId, data);
        alreadySeenMessages.add(data.id);
    }
};

const broadcast = (message: Object, id = randomUUID(), origin = NODE_ID, ttl = 1000) => {
    p2psend({ id, ttl, type: 'broadcast', message, origin });
};

const dm = (destination: string, message: Object, origin = NODE_ID, ttl = 10, id = randomUUID()) => {
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
        if (data.type === 'broadcast'){
            emitter.emit('broadcast', { message: data.message, origin: data.origin });
            broadcast(data.message, data.id, data.origin, data.ttl - 1);
        }

        if (data.type === 'dm') {
            if (data.destination === NODE_ID) {
                emitter.emit('dm', { origin: data.origin, message: data.message });
            } else {
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