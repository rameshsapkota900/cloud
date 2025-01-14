const WebSocket = require('ws');

// Create WebSocket server bound to the specified IP and port
const wss = new WebSocket.Server({ host: '192.168.1.66', port: 5050 });

let node1 = null;
let node2 = null; 

wss.on('connection', (ws) => {
    console.log('A new client connected.');

    // Assign the first connected client as Node1
    if (node1 === null) {
        node1 = ws;
        console.log('Node1 connected.');
    }
    // Assign the second connected client as Node2
    else if (node2 === null) {
        node2 = ws;
        console.log('Node2 connected.');
    }

    // Handle incoming messages
    ws.on('message', (message) => {
        console.log(`Received: ${message}`);
        wss.clients.forEach((client) => {
            client.send(`${message}`);
        });
    });

    // Handle client disconnect
    ws.on('close', () => {
        if (ws === node1) {
            console.log('Node1 disconnected.');
            node1 = null;  // Reset Node1
        } else if (ws === node2) {
            console.log('Node2 disconnected.');
            node2 = null;  // Reset Node2
        }
    });

    // Handle any errors
    ws.on('error', (err) => {
        console.error('WebSocket error:', err);
    });
});

console.log('WebSocket server is listening on ws://192.168.1.66:5050');
