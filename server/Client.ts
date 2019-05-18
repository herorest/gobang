/**
 * 客户端连接对象
 */

import GameMessageBase, { GameMessageType } from "./GameMessageBase";
import ClientManager from "./ClientManager";

export default class Client{
    ws: WebSocket; 
    pairClient: Client; // 指向对手的client

    constructor(socket){
        this.ws = socket;

        socket.on('message', this.onMessage.bind(this));
    }

    onMessage(data){
        let msg = JSON.parse(data);
        if(msg.type == GameMessageType.Hello){

        }else if(msg.type == GameMessageType.Match){
            ClientManager.getInstance().match(this);
        }else if(msg.type == GameMessageType.C2S_Put){
            this.sendMsg(msg);
            this.pairClient.sendMsg(msg);
        }
    }

    // 向WSClient发送信息
    sendMsg(msg){
        this.ws.send(JSON.stringify(msg));
    }
}