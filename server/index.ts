import WebSocket = require('ws');
import Client from './Client';
import ClientManager from './ClientManager';

let ws = new WebSocket.Server({port: 8080});

ws.on('connection', (socket, request) => {
    let client = new Client(socket);
    ClientManager.getInstance().addClient(client);
});