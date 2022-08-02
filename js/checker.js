let whiteKing
let blackKing
function afterPlay(){
    for(func of afterTurn){
        func()
    }
    specialMoves={}
    ////used to check afterplay some states
    //check if white and black kind is dead so killer win
    uncheck(whiteKing)
    uncheck(blackKing)
    if(!board.whitePieces.king.isAlive){
        win("black")
        return
    }else if(!board.blackPieces.king.isAlive){
        win("white")
        return
    }
    //used assign to clone object not to point for it
    whiteKing=Object.assign({},board.whitePieces.king )
    blackKing=Object.assign({},board.blackPieces.king)
    /* 
    looping in white and black pieces and check for :-
        (1) if pawn go to the last row he upagrade him 
        (2) if one was killed so it delete him
        (3) if one turn check if allow him to click on pieces
        (4) check if there is a check
    */
    for(let key in board.whitePieces){
        let piece=board.whitePieces[key]
        let place=piece.position
        if(!piece.isAlive){
            delete board.whitePieces[piece]
            continue
        }
        if(piece.type==="pawn"&&piece.position[1]==="8"){
            changePawn(piece)
        }
        for(let move of piece.getAvailablePlaces()){
            if(move===blackKing.position){
                check(blackKing)
            }
        }
        if(isWhiteTurn){
            board[place].onclick=()=>{
                for(func of beforeClick){
                    func()
                }
                preSelect=piece
                let moves=piece.getAvailablePlaces()
                for(let i=0;i<moves.length;i++){
                    if(moves[i]){
                        board[moves[i]].html.innerHTML+='<div class="dot"><div/>'
                    }
                }
                select=true
                selectedPiece=piece
            }
        }else{
            piece.positions.push(piece.position)
            board[piece.position].onclick=()=>{}
        }
    }

    for(let key in board.blackPieces){
        let piece=board.blackPieces[key]
        let place=piece.position
        piece.getAvailablePlaces()
        if(!piece.isAlive){
            delete board.blackPieces[piece]
            continue
        }
        if(piece.type==="pawn"&&piece.position[1]==="1"){
            changePawn(piece)
        }
        
        for(let move of piece.getAvailablePlaces()){
            if(move===whiteKing.position){
                check(whiteKing)
            }
        }
        if(!isWhiteTurn){
            board[place].onclick=()=>{
                preSelect=piece
                let moves=piece.getAvailablePlaces()
                for(let i=0;i<moves.length;i++){
                    if(moves[i]){
                        board[moves[i]].html.innerHTML+='<div class="dot"><div/>'
                    }
                }
                select=true
                selectedPiece=piece
            }
        }else{
            piece.positions.push(piece.position)
            board[piece.position].onclick=()=>{}
        }
    }
    isWhiteTurn=!isWhiteTurn
    afterTurn=[]
}