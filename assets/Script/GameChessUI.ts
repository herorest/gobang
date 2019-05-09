import { GameChessType } from './GameData';
import Config from "./Config";

const {ccclass, property} = cc._decorator;

@ccclass
export default class GameChessUI extends cc.Component {

    @property(cc.Node)
    chessWhite: cc.Node = null;

    @property(cc.Node)
    chessBlack: cc.Node = null;

    @property(cc.Node)
    pointRed: cc.Node = null;

    i: number;

    j: number;

    onLoad () {
        
    }

    setChessType(gameChess){
        this.chessWhite.active = gameChess.chessType === GameChessType.White;
        this.chessBlack.active = gameChess.chessType === GameChessType.Black;
        this.pointRed.active = gameChess.isLastPutChess;
    }

    onClick(){

    }
}
