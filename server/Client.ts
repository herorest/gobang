/**
 * 客户端连接对象
 */

import GameMessageBase, { GameMessageType } from "./GameMessageBase";
import ClientManager from "./ClientManager";

export default class Client{
    ws: WebSocket;
    pairClient: Client;

    constructor(socket){
        this.ws = socket;

        socket.on('message', this.onMessage.bind(this));
    }

    onMessage(data){
        let msg = JSON.parse(data);
        console.log(msg);
        if(msg.type == GameMessageType.Hello){
            console.log('=====hello');
        }else if(msg.type == GameMessageType.Match){
            console.log('=====matching');
            ClientManager.getInstance().match(this);
        }
    }

    // 向WSClient发送信息
    sendMsg(msg){
        this.ws.send(JSON.stringify(msg));
    }
}