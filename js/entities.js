//delete print because i use it instead of console.log in some times as i love python
delete print
let isWhiteTurn = true
const peicesNames = ["pawn", "rook", "knight", "bishop", "queen", "king"]
const letters = ["a", "b", "c", "d", "e", "f", "g", "h"]
const placesInChess = []
//fill the array with places by add 8 places with same letter
for (let i = 0; i < letters.length; i++) {
    let letter = letters[i]
    for (let j = 1; j <= 8; j++) { placesInChess.push(letter + j) }
}
//select and selected place using in board
let [select, selectedPiece, cloneNumber, specialMoves] = [false, undefined, 1, {}]
let [whiteScore,blackScore]=[0,0]
//arrow functions
const squaresMove = (position, x = 0, y = 0) => (letters[letters.indexOf(position.split("")[0]) + x]) + (+position.split("")[1] + y)
const isOn = (position) => placesInChess.includes(position)
const check = (kingPiece) => board[kingPiece.position].html.style.border = "2px solid red"
const uncheck=(kingPiece)=>{kingPiece?board[kingPiece.position].html.style.border = null:undefined}

//usual functions
function upgradePawn(pawn) {
    //used to upgrade the pawn when pawn be in the last row
    let div = document.querySelector(pawn.isWhite ? ".upgrade-white" : ".upgrade-black")
    for (key in pawn.isWhite ? board.blackPieces : board.whitePieces) {
        board.blackPieces[key].onclick = () => { }
    }
    div.style.display = "block"
    pawn.isAlive = false
    afterPlay()
    for (ele of div.children) {
        if (ele.dataset.type) {
            let type = ele.dataset.type
            ele.onclick = () => {
                pawn.erase()
                team = pawn.isWhite ? board.whitePieces : board.blackPieces
                team["new" + type + cloneNumber] = new Piece(type, pawn.isWhite, pawn.position)
                cloneNumber++
                div.style.display = "none"
                afterPlay()
            }
        }
    }
}
function win(team) {
    let isWhite=team==="white"
    isWhite?whiteScore++:blackScore++
    
    //make all pieces not allowed to move
    for (key in isWhite?board.blackPieces:board.whitePieces) {
        board.blackPieces[key].onclick = () => { }
    }
    document.querySelector(".win").style.display = "block"
    document.querySelector(".win h2 span").innerHTML = team
    document.querySelector(".win button").onclick = () => {
        resetGame()
        document.querySelector(".win").style.display = "none"
        isWhite?document.getElementById("whiteScore").innerText=whiteScore:document.getElementById("blackScore").innerText=blackScore
    }
}
function killIt(piece) {
    piece.erase()
    piece.isAlive = false
}
function resetGame(){
    for(let key in board.whitePieces){
        board.whitePieces[key].erase()
    }
    for(let key in board.blackPieces){
        board.blackPieces[key].erase()
    }
    delete board
    isWhiteTurn=true
    select=false
    selectedPiece=undefined
    specialMove={}
    cloneNumber=1
    board = new Board()
    board.makePieces()
    afterPlay()
}
Array.prototype.delete = (index) => [...this.slice(0, index), ...this.slice(index + 1, this.length)]