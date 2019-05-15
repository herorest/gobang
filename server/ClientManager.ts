import Client from './Client';
import GameMessageBase, { GameMessageType } from './GameMessageBase';

export default class ClientManager{

    private static _instance: ClientManager = null;

    static getInstance() {
        if(!ClientManager._instance){
            ClientManager._instance = new ClientManager();
        }
        return ClientManager._instance;
    }

    allClients: Client[] = [];

    matchingClients: Client[] = [];

    addClient(client){
        this.allClients.push(client);
    }

    // 对手匹配
    match(client){
        if(this.matchingClients.length === 0){
            this.matchingClients.push(client);
        }else{
            let pair = this.matchingClients.shift();
            client.pairClient = pair;
            pair.pairClient = client;

            let msg = new GameMessageBase();
            msg.type = GameMessageType.S2C_MatchOver;

            console.log('match over', msg);
            client.sendMsg(msg);
            pair.sendMsg(msg);
        }
    }

    constructor(){
        
    }
}