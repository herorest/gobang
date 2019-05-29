import WebSocket = require('ws');
import Client from './Client';
import ClientManager from './ClientManager';
import DBManager from './DBManager';

DBManager.getInstance(DBManager).connectDB();

let ws = new WebSocket.Server({port: 8080});

ws.on('connection', (socket, request) => {
    let client = new Client(socket);
    ClientManager.getInstance().addClient(client);
});

setTimeout(() => {
    console.log(DBManager.getUserCollection());
    DBManager.getUserCollection().find({}).toArray((err, result) => {
        console.log(result);
    });

}, 1000);
