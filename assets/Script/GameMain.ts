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
                let chess = cc.instantiate(this.prefabChess);
                chess.x = (i - 7) * Config.ChessSpaceWidth;
                chess.y = (j - 7) * Config.ChessSpaceHeight;
                chess.parent = this.tableCenter;
                this.allChess[i][j] = chess.getComponent('GameChessUI') as GameChessUI;
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
