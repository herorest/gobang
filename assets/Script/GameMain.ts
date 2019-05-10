import Config from "./Config";
import GameData, { GameChessType } from "./GameData";
import GameChessUI from "./GameChessUI";
import GamePlayer from "./GamePlayer";

const {ccclass, property} = cc._decorator;

@ccclass
export default class GameMain extends cc.Component {

    @property(cc.Node)
    tableCenter: cc.Node = null;

    @property(cc.Prefab)
    prefabChess: cc.Prefab = null;

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
        this.createPlayer();
    }

    createPlayer(){
        let self = new GamePlayer();
        self.uid = 1;
        self.userName = 'myself';
        self.isSelfPlayer = true;
        self.chessType = GameChessType.White;
        this.self = self;
        this.curr = self;

        let other = new GamePlayer();
        other.uid = 2;
        other.userName = 'other';
        other.isSelfPlayer = true;
        other.chessType = GameChessType.Black;
        this.other = other;
    }

    changePlayer(){
        if(this.curr.uid === 1){
            this.curr =  this.other;
        }else{
            this.curr = this.self;
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
        let data = this.gameData.data[i][j];
        if(data.chessType !== GameChessType.None){
            return;
        }
        this.lastChess && (this.lastChess.pointRed.active = false);
        data.chessType = this.curr.chessType;
        data.isLastPutChess = true;
        this.allChess[i][j].setChessType(data);
        this.lastChess = this.allChess[i][j];
        this.changePlayer();
    }
}
