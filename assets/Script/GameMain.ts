import Config from "./Config";
import GameData from "./GameData";
import GameChessUI from "./GameChessUI";

const {ccclass, property} = cc._decorator;

@ccclass
export default class GameMain extends cc.Component {

    @property(cc.Node)
    tableCenter: cc.Node = null;

    @property(cc.Prefab)
    prefabChess: cc.Prefab = null;

    gameData = null;

    allChess = [];

    onLoad () {
        this.gameData = new GameData();

        for(let i = 0; i <= 14; i++){
            this.allChess[i] = [];
            for(let j = 0; j <= 14; j++){
                let chess = cc.instantiate(this.prefabChess).getComponent('GameChessUI') as GameChessUI;
                chess.node.x = (i - 7) * Config.ChessSpaceWidth;
                chess.node.y = (j - 7) * Config.ChessSpaceHeight;
                chess.node.parent = this.tableCenter;
                
                chess.i = i;
                chess.j = j;
                
                this.allChess[i][j] = chess;
            }
        }

        this.refresh();
    }

    createPlayer(){}

    changePlayer(){}

    refresh(){
        for(let i = 0; i <= 14; i++){
            for(let j = 0; j <= 14; j++){
                this.allChess[i][j].setChessType(this.gameData.data[i][j]);
            }
        }
    }
}
