export default class GameData {

}

class gameChess{
    chessType: GameChessType = GameChessType.None;
    isLastPutChess: boolean = false;
}

enum GameChessType{
    None,
    White,
    Black
}