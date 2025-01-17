const http = require('http');
const WebSocket = require('ws');

const server = http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('WebSocket server is running.');
});
// Create WebSocket server bound to the specified IP and port
const wss = new WebSocket.Server({server:server});

let node1 = null;
let node2 = null; 

wss.on('connection', (ws) => {
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

server.listen(5050, ()=>{console.log('WebSocket server is listening on port 5050');});

