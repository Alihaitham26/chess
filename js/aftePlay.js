let whiteKing,blackKing
function afterPlay(){
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
    whiteKing=Object.assign({},board.whitePieces.king)
    blackKing=Object.assign({},board.blackPieces.king)
    /* 
    looping in white and black pieces and check for :-
        (1) if pawn go to the last row he upagrade him 
        (2) if one was killed so it delete him
        (3) if one turn check if allow him to click on pieces
        (4) check if there is a check
    */
   let teams=[board.whitePieces,board.blackPieces]
   for(let team of teams){
       for(let key in team){
           let piece=team[key]
           let place=piece.position
           if(!piece.isAlive){
               delete team[piece]
               continue
           }
           if(piece.type==="pawn"&&piece.position[1]==="8"){
               upgradePawn(piece)
           }
           for(let move of piece.getavailableMoves()){
            let king=piece.isWhite?blackKing:whiteKing
               if(move===king.position){
                   check(king)
               }
           }
           if(isWhiteTurn==piece.isWhite){
               board[place].onclick=()=>{
                   preSelect=piece
                   let moves=piece.getavailableMoves()
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
   }
    isWhiteTurn=!isWhiteTurn
}