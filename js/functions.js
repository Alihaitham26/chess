function squaresMove(position,x=0,y=0){
    //used to move in board as cord
    position=position.split("")
    return (letters[letters.indexOf(position[0])+x])+(+position[1]+y)
}
function isOn(position){
    //check if position in the board
    return placesInChess.includes(position)
}
function changePawn(pawn){
    //used to upgrade the pawn when pawn be in the last row
    let div
    if(pawn.isWhite){
        div=document.querySelector(".upgrade-white")
        for(key in chess.blackPieces){
            chess.blackPieces[key].onclick=()=>{}
        }
    }else{
        div=document.querySelector(".upgrade-black")
        for(key in chess.whitePieces){
            chess.whitePieces[key].onclick=()=>{}
        }
    }
    div.style.display="block"
    pawn.isAlive=false
    
    afterPlay()
    for(ele of div.children){
        if(ele.dataset.type){
            let type=ele.dataset.type
            ele.onclick=()=>{
                pawn.erase()
                team=pawn.isWhite?chess.whitePieces:chess.blackPieces
                team["new"+type+cloneNumber]=new Piece(type,pawn.isWhite,pawn.position)
                cloneNumber++
                div.style.display="none"
                afterPlay()
            }
        }
    }
}
function win(team){
    //make all pieces not allowed to move
    for(key in chess.blackPieces){
        chess.blackPieces[key].onclick=()=>{}
    }
    for(key in chess.whitePieces){
        chess.whitePieces[key].onclick=()=>{}
    }
    document.querySelector(".win").style.display="block"
    document.querySelector(".win h2 span").innerHTML=team
    document.querySelector(".win button").onclick=()=>{window.location.reload()}
}
function check(kingPiece){
    kingPiece.square.html.style.border="2px solid red"
}
function uncheck(kingPiece){
    if(kingPiece){
        kingPiece.square.html.style.border=null
    }
}
function isCheck(position,isWhite){
    isCheckTest=true
    let enemyPeices=isWhite?chess.blackPieces:chess.whitePieces
    for(let pieceKey in enemyPeices){
        for(let move of enemyPeices[pieceKey].getAvailablePlaces()){
            if(position===move){
                isCheckTest=false
                return true
            }
        }
    }
    isCheckTest=false
    return false
}
Array.prototype.delete=function (index){
    return [...this.slice(0,index),...this.slice(index+1,this.length)]
}