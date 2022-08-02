class Board {
    makePieces(){
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
    constructor() {
        //looping in places to make object to each place that has(place,is full with peice,peice on him,html element)
        for (let i = 0; i < placesInChess.length; i++) {
            let place = placesInChess[i]
            this[place] = {
                place: place,
                isFull: false,
                piece: null,
                html: document.querySelector("." + place),
                set onclick(func=()=>{}){
                    this._onclick=func
                    this.html.onclick=()=>{select?this._onselect():this._onclick()}
                },
                set onselect(func=()=>{}){
                    this._onselect=func
                    this.html.onclick=()=>{select?this._onselect():this._onclick()}
                },
            }
            this[place].onclick=()=>{}
            this[place].onselect=()=>{
                select=false
                let moves=selectedPiece.getAvailablePlaces()
                for(let i=0;i<moves.length&&board[moves[i]];i++){
                    board[moves[i]].html.innerHTML=null
                    if(board[moves[i]].isFull){
                        board[moves[i]].piece.draw()
                    }
                }
                if(moves.includes(place)){
                    if(this[place].isFull){
                        killIt(this[place].piece)
                        selectedPiece.moveTo(place)
                    }else{
                        selectedPiece.moveTo(place)
                    }
                    for(let key in specialMoves){
                        if(specialMoves[key].condition(place)){
                            specialMoves[key].action(place)
                        }
                    }
                    afterPlay()
                }
            }
        }

    }
}