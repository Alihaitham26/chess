//delete print because i use it instead of console.log in some times as i love python
delete print
let isWhiteTurn=true
const peicesNames=["pawn","rook","knight","bishop","queen","king"]
const letters=["a","b","c","d","e","f","g","h"]
const placesInChess=[]
//fill the array with places by add 8 places with same letter
for(let i=0;i<letters.length;i++){
    let letter=letters[i]
    for(let j=1;j<=8;j++){placesInChess.push(letter+j)}
}
//select and selected place using in board
let [select,selectedPiece,cloneNumber,specialMoves]=[false,undefined,1,{},[]]
function squaresMove(position,x=0,y=0){
    //used to move in board as cord
    position=position.split("")
    return (letters[letters.indexOf(position[0])+x])+(+position[1]+y)
}
const isOn=(position)=>placesInChess.includes(position)
function upgradePawn(pawn){
    //used to upgrade the pawn when pawn be in the last row
    let div
    if(pawn.isWhite){
        div=document.querySelector(".upgrade-white")
        for(key in board.blackPieces){
            board.blackPieces[key].onclick=()=>{}
        }
    }else{
        div=document.querySelector(".upgrade-black")
        for(key in board.whitePieces){
            board.whitePieces[key].onclick=()=>{}
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
                team=pawn.isWhite?board.whitePieces:board.blackPieces
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
    for(key in board.blackPieces){
        board.blackPieces[key].onclick=()=>{}
    }
    for(key in board.whitePieces){
        board.whitePieces[key].onclick=()=>{}
    }
    document.querySelector(".win").style.display="block"
    document.querySelector(".win h2 span").innerHTML=team
    document.querySelector(".win button").onclick=()=>{window.location.reload()}
}
const check=(kingPiece)=>kingPiece.square.html.style.border="2px solid red"
function uncheck(kingPiece){
    if(kingPiece){
        kingPiece.square.html.style.border=null
    }
}
function isCheck(position,isWhite,board=board){
    let enemyPeices=isWhite?board.blackPieces:board.whitePieces
    for(let pieceKey in enemyPeices){
        for(let move of enemyPeices[pieceKey].getavailableMoves()){
            if(position===move){
                return true
            }
        }
    }
    return false
}
function killIt(piece){
    board[piece.position].html.innerHTML=null
    piece.isAlive=false
    board[piece.position].isFull=false
    board[piece.position].piece=null
}
Array.prototype.delete=(index)=>[...this.slice(0,index),...this.slice(index+1,this.length)]