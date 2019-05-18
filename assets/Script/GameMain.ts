import { GameMessagePut, GameMessageMatchOver } from './GameMessageBase';
import { Helper } from './Helper';
import Config from "./Config";
import GameData, { GameChessType } from "./GameData";
import GameChessUI from "./GameChessUI";
import GamePlayer from "./GamePlayer";
import WSClient from "./WSClient";
import EventDefine from './EventDefine';
import EventCenter from './EventCenter';

const {ccclass, property} = cc._decorator;

@ccclass
export default class GameMain extends cc.Component {

    @property(cc.Node)
    tableCenter: cc.Node = null;

    @property(cc.Prefab)
    prefabChess: cc.Prefab = null;

    @property(cc.Label)
    label: cc.Label = null;

    gameData = null;

    allChess = [];

    lastChess;

    self;

    other;

    curr;

    onLoad () {
        this.putChess.bind(this);
        this.gameData = new GameData();

        for(let i = 0; i <= 14; i++){
            this.allChess[i] = [];
            for(let j = 0; j <= 14; j++){
                let chess = cc.instantiate(this.prefabChess).getComponent('GameChessUI') as GameChessUI;
                chess.node.x = (i - 7) * Config.ChessSpaceWidth;
                chess.node.y = (j - 7) * Config.ChessSpaceHeight;
                chess.node.parent = this.tableCenter;
                chess.main = this;
                chess.i = i;
                chess.j = j;
                
                this.allChess[i][j] = chess;
            }
        }

        this.refresh();

        EventCenter.registEvent(EventDefine.EVENT_MATCH_OVER, this.onMsgMatchOver, this);
        EventCenter.registEvent(EventDefine.EVENT_PUT, this.onMsgPut, this);
    }

    onMsgMatchOver(msg: GameMessageMatchOver){
        let self = new GamePlayer();
        self.uid = msg.myUid;
        self.userName = 'myself';
        self.isSelfPlayer = true;
        self.chessType = msg.myChessType;
        this.self = self;

        let other = new GamePlayer();
        other.uid = msg.otherUid;
        other.userName = 'other';
        other.isSelfPlayer = false;
        other.chessType = msg.myChessType === GameChessType.Black ? GameChessType.White : GameChessType.Black;
        this.other = other;

        // 白子先下
        if(self.chessType === GameChessType.White){
            this.curr = self;
        }else{
            this.curr = other;
        }

        this.updateRound();
    }

    changePlayer(currUid){
        console.log('----change', currUid);
        if(currUid === this.other.uid){
            this.curr =  this.self;
        }else{
            this.curr = this.other;
        }
    }

    updateRound(){
        console.log(this.curr.uid , this.self.uid);
        if(this.curr.uid === this.self.uid){
            this.label.string = "你的回合";
        }else{
            this.label.string = "对方的回合";
        }
    }

    refresh(){
        for(let i = 0; i <= 14; i++){
            for(let j = 0; j <= 14; j++){
                this.allChess[i][j].setChessType(this.gameData.data[i][j]);
            }
        }
    }

    putChess(i, j){

        if(!this.curr){
            return;
        }

        // 如果是自己，发出下子的消息
        if(this.curr.isSelfPlayer){
            WSClient.getInstance().send(new GameMessagePut(this.curr.uid, i, j));
        }

        this.curr = null;
    }

    onMsgPut(msg){

        let uid = msg.uid, i = msg.i, j = msg.j;

        let player = this.getPlayer(uid)

        // 位置上一定为空的才能落子
        let data = this.gameData.data[i][j];
        if(data.chessType !== GameChessType.None){
            return;
        }

        // 去掉之前棋子上的红色记号
        this.lastChess && (this.lastChess.pointRed.active = false);
        data.chessType = player.chessType;
        data.isLastPutChess = true;


        this.allChess[i][j].setChessType(data);
        this.lastChess = this.allChess[i][j];

        let result = this.checkWin(i, j);

        if(result){
            alert('over');
            return;
        }else{
            this.changePlayer(uid);
        }

        this.updateRound();
    }

    getPlayer(uid){
        if(uid == this.self.uid){
            return this.self;
        }else if(uid == this.other.uid){
            return this.other;
        }
    }

    checkWin(i, j){
        let ct = this.gameData.getChessData(i, j).chessType
        let result = Helper.checkHorizontral(this.gameData, i, j, ct) || Helper.checkVertical(this.gameData, i, j, ct) || Helper.checkObliqueUp(this.gameData, i, j, ct) || Helper.checkObliqueDown(this.gameData, i, j, ct);
        return result;
    }

    
}
