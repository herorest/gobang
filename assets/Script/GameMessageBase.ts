/**
 * 消息定义
 */

export default class GameMessageBase{
    type: GameMessageType;
}

export enum GameMessageType{
    Hello,
    Match,
    C2S_Put,
    S2C_MatchOver

}

export class GameMessagePut extends GameMessageBase{
    type: GameMessageType = GameMessageType.C2S_Put;
    uid: number;
    i: number;
    j: number;

    constructor(uid, i, j){
        super();
        this.uid = uid;
        this.i = i;
        this.j = j;
    }
}

export class GameMessageMatchOver extends GameMessageBase{
    type: GameMessageType = GameMessageType.S2C_MatchOver;
    myUid: number;
    otherUid: number;
    myChessType;

    constructor(myUid, otherUid, myChessType){
        super();
        this.myUid = myUid;
        this.otherUid = otherUid;
        this.myChessType = myChessType;
    }
}