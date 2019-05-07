import Config from "./Config";

const {ccclass, property} = cc._decorator;

@ccclass
export default class GameInit extends cc.Component {

    @property(cc.Prefab)
    prefabGameMain: cc.Prefab = null;

    onLoad () {
        let gameMain = cc.instantiate(this.prefabGameMain);
        gameMain.parent = this.node;
    }
}
