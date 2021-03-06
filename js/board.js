class Board {
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