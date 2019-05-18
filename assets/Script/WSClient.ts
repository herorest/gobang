import { GameMessageType } from "../../server/GameMessageBase";
import EventDefine from "./EventDefine";
import EventCenter from "./EventCenter";

const {ccclass, property} = cc._decorator;

@ccclass
export default class WSClient extends cc.Component {

    private static _instance: WSClient = null;

    static getInstance(){
        return WSClient._instance;
    }

    ws: WebSocket;

    onLoad(){
        WSClient._instance = this;
    }

    start(){
        console.log('client try connect server');
        this.ws = new WebSocket('ws://127.0.0.1:8080');
        this.ws.onopen = () => {
            console.log('==== start match');
            this.send({type: GameMessageType.Match});
        }

        this.ws.onmessage = (e) => {
            console.log('client message', e.data);
            let msg = JSON.parse(e.data);

            if(msg.type === GameMessageType.S2C_MatchOver){
                EventCenter.postEvent(EventDefine.EVENT_MATCH_OVER, msg);
            }else if(msg.type === GameMessageType.C2S_Put){
                EventCenter.postEvent(EventDefine.EVENT_PUT, msg);
            }
        }
    }

    send(msg){
        console.log(JSON.stringify(msg));
        this.ws.send(JSON.stringify(msg));
    }
}
