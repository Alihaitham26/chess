//delete print because i use it instead of console.log in some times as i love python
delete print
let isWhiteTurn=true
const peicesNames=["pawn","rook","knight","bishop","queen","king"]
const letters=["a","b","c","d","e","f","g","h"]
const placesInChess=[]
//fill the array with places by add 8 places with same letter
for(let i=0;i<letters.length;i++){
    let letter=letters[i]
    for(let j=1;j<=8;j++){
        placesInChess.push(letter+j)
    }
}
//select and selected place using in board
let select=false
let selectedPiece
//used to naming the upgraded pawn
let isCheckTest=false
let cloneNumber=1
let specialMoves={}
let afterTurn=[]
let beforeClick=[]
let hello=[1,2,3]