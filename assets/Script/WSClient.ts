const {ccclass, property} = cc._decorator;

@ccclass
export default class WSClient extends cc.Component {
    start(){
        console.log('client try connect server');
        let ws = new WebSocket('ws://127.0.0.1:8080');
        ws.onopen = (e) => {
            ws.send(JSON.stringify({type:1}));
        }

        ws.onmessage = (e) => {
            console.log('onmessage',e);
        }
    }
}
