import WebSocket = require('ws');
import Client from './Client';
import ClientManager from './ClientManager';
import DBManager from './DBManager';


let ws = new WebSocket.Server({port: 8080});

ws.on('connection', (socket, request) => {
    let client = new Client(socket);
    ClientManager.getInstance().addClient(client);
});

DBManager.getInstance(DBManager).connectDB(() => {
    DBManager.getUserCollection().find({}).toArray((err, result) => {
        console.log(result);
    });
});

