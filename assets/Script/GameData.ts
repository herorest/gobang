/**
 * 棋子数据层
 */
export default class GameData {

    data = [];

    constructor(){
        for(let i = 0; i <= 14; i++){
            this.data[i] = [];
            for(let j = 0; j <= 14; j++){
                this.data[i][j] = new GameChess();
            }
        }
    }
}

class GameChess{
    chessType: GameChessType = GameChessType.None;
    isLastPutChess: boolean = false;
}

export enum GameChessType{
    None,
    White,
    Black
}