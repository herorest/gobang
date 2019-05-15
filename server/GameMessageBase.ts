/**
 * 消息定义
 */

export default class GameMessageBase{
    type: GameMessageType;
}

export enum GameMessageType{
    Hello,
    Match,
    Put,
    S2C_MatchOver

}