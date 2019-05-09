import { GameChessType } from './GameData';
import Config from "./Config";

const {ccclass, property} = cc._decorator;

@ccclass
export default class GamePlayer extends cc.Component {

    uid: number;

    userName: string;

    isSelfPlayer: boolean;

    chessType: GameChessType;

    onLoad () {
       
    }
}
