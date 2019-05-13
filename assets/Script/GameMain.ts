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

        this.checkWin(i, j);
        this.changePlayer();
    }

    checkWin(i, j){
        let ct = this.gameData.getChessData(i, j).chessType
        this.checkHorizontral(i, j, ct);
    }

    checkHorizontral(i, j, chessType){
        let total = 1;
        let posI;

        for(posI = i - 1; posI >= 0; posI--){
            if(this.gameData.getChessData(posI, j).chessType === chessType){
                total ++;
            }else{
                break;
            }
        }

        for(posI = i + 1; posI < Config.gridCount; posI++){
            if(this.gameData.getChessData(posI, j).chessType === chessType){
                total ++;
            }else{
                break;
            }
        }

        if(total >= 5){
            return true;
        }

        return false;
    }

    checkVertical(i, j, chessType){
        let total = 1;
        let posJ;

        for(posJ = j - 1; posJ >= 0; posJ--){
            if(this.gameData.getChessData(i, posJ).chessType === chessType){
                total ++;
            }else{
                break;
            }
        }

        for(posJ = j + 1; posJ < Config.gridCount; posJ++){
            if(this.gameData.getChessData(i, posJ).chessType === chessType){
                total ++;
            }else{
                break;
            }
        }

        if(total >= 5){
            return true;
        }

        return false;
    }

    checkObliqueUp(i, j, chessType){
        let total = 1;
        let posJ;


        if(total >= 5){
            return true;
        }

        return false;
    }

    checkObliqueDown(i, j, chessType){
        
        return false;
    }
}
