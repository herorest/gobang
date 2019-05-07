import Config from "./Config";

const {ccclass, property} = cc._decorator;

@ccclass
export default class GameChess extends cc.Component {

    @property(cc.Node)
    chessWhite: cc.Node = null;

    @property(cc.Node)
    chessBlack: cc.Node = null;

    @property(cc.Node)
    pointRed: cc.Node = null;

    onLoad () {
        
    }
}
