import Config from "./Config";
import GameData from "./GameData";

const {ccclass, property} = cc._decorator;

@ccclass
export default class GameMain extends cc.Component {

    @property(cc.Node)
    tableCenter: cc.Node = null;

    @property(cc.Prefab)
    prefabChess: cc.Prefab = null;

    gameData = null;

    allChess:any[] = [];

    onLoad () {
        this.gameData = new GameData();

        for(let i = -7; i <= 7; i++){
            for(let j = -7; j <= 7; j++){
                let chess = cc.instantiate(this.prefabChess);
                chess.x = i * Config.ChessSpaceWidth;
                chess.y = j * Config.ChessSpaceHeight;
                chess.parent = this.tableCenter;
            }
        }
    }
}
