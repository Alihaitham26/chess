const board = new Board()
//make chrss class that contain info
class Chess {
    constructor() {
        this.whitePieces = {}
        this.blackPieces = {}
        for (let i = 0; i < letters.length; i++) {
            this.whitePieces["pawn" + (i + 1)] = new Piece("pawn", 1, letters[i] + 2)
            this.blackPieces["pawn" + (i + 1)] = new Piece("pawn", 0, letters[i] + 7)
        }
        let teams=[this.blackPieces,this.whitePieces]
        for(let i=0;i<teams.length;i++){
            teams[i]["rook1"]=new Piece("rook",i,"a"+(8-i*7))
            teams[i]["rook2"]=new Piece("rook",i,"h"+(8-i*7))
            teams[i]["knight1"]=new Piece("knight",i,"b"+(8-i*7))
            teams[i]["knight2"]=new Piece("knight",i,"g"+(8-i*7))
            teams[i]["bishop1"]=new Piece("bishop",i,"c"+(8-i*7))
            teams[i]["bishop2"]=new Piece("bishop",i,"f"+(8-i*7))
            teams[i]["queen"]=new Piece("queen",i,"d"+(8-i*7))
            teams[i]["king"]=new Piece("king",i,"e"+(8-i*7))
        }
    }
}