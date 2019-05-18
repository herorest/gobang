import Config from './Config'

export class Helper{
    static checkHorizontral(data, i, j, chessType){
        let total = 1;
        let posI;

        for(posI = i - 1; posI >= 0; posI--){
            if(data.getChessData(posI, j).chessType === chessType){
                total ++;
            }else{
                break;
            }
        }

        for(posI = i + 1; posI < Config.gridCount; posI++){
            if(data.getChessData(posI, j).chessType === chessType){
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

    static checkVertical(data, i, j, chessType){
        let total = 1;
        let posJ;

        for(posJ = j - 1; posJ >= 0; posJ--){
            if(data.getChessData(i, posJ).chessType === chessType){
                total ++;
            }else{
                break;
            }
        }

        for(posJ = j + 1; posJ < Config.gridCount; posJ++){
            if(data.getChessData(i, posJ).chessType === chessType){
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

    static checkObliqueUp(data, i, j, chessType){
        let total = 1;
        let posI, posJ;

        for((posI = i - 1,posJ = j - 1); (posI >= 0 && posJ >= 0); (posI--, posJ--)){
            if(data.getChessData(posI, posJ).chessType === chessType){
                total ++;
            }else{
                break;
            }
        }

        for((posI = i + 1,posJ = j + 1); (posI < Config.gridCount && posJ < Config.gridCount); (posI++, posJ++)){
            if(data.getChessData(posI, posJ).chessType === chessType){
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

    static checkObliqueDown(data, i, j, chessType){
        let total = 1;
        let posI, posJ;

        for((posI = i + 1,posJ = j - 1); (posI < Config.gridCount && posJ >= 0); (posI++, posJ--)){
            if(data.getChessData(posI, posJ).chessType === chessType){
                total ++;
            }else{
                break;
            }
        }

        for((posI = i - 1,posJ = j + 1); (posI >= 0 && posJ < Config.gridCount); (posI--, posJ++)){
            if(data.getChessData(posI, posJ).chessType === chessType){
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
}