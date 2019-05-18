import Client from './Client';
import GameMessageBase, { GameMessageType, GameMessageMatchOver } from './GameMessageBase';

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

            let uid0 = 1000;
            let uid1 = 2000;

            let msg0 = new GameMessageMatchOver(uid0, uid1, 1);
            msg0.type = GameMessageType.S2C_MatchOver;
            client.sendMsg(msg0);


            let msg1 = new GameMessageMatchOver(uid1, uid0, 2);
            msg1.type = GameMessageType.S2C_MatchOver;
            pair.sendMsg(msg1);
        }
    }

    constructor(){
        
    }
}