class Piece {
    static piecesCreated = 0
    
    constructor(type, isWhite, position) {
        if(type==="pawn"){
            this.pawnSpeicalKill={
                left:true,
                right:true
            }
        }
        Piece.piecesCreated+=1
        if(!peicesNames.includes(type)){
            throw new Error(`"${type}" is not a peice in chess`)
        }
        this.lastPosition=null
        this.notMoved=true
        this.isFirstMove=false
        this.lastPosition=null
        this.isAlive=true
        this.type = type
        this.isWhite = isWhite
        this.position = position
        this.ex = isWhite ? "w" : "b"
        this.color = isWhite ? "white" : "black"
        this.imageSrc = `imgs/${this.ex}_${this.type}.png`
        this.getAvailablePlaces=getAvailablePlacesFunction(this)
        this.square=board[this.position]
        this.square.isFull = true
        this.square.piece = this
        this.draw()
        delete this.getAvailablePlacesFunction
    }
    set onclick(func){
        board[this.position].onclick=func
    }
    //draw peices in the board
    draw() {
        board[this.position].isFull = true
        board[this.position].piece = this
        board[this.position].html.innerHTML = `<img src="${this.imageSrc}">`
    }
    //erase peices in the board
    erase() {
        board[this.position].isFull = false
        board[this.position].piece = null
        board[this.position].html.innerHTML = ""
        board[this.position].onclick=()=>{}
    }
    //earse peice and draw it in new place
    moveTo(newPosition) {
        
        this.isFirstMove=this.notMoved
        this.erase()
        this.notMoved=false
        this.lastPosition=this.position
        this.position = newPosition
        this.square=board[this.position]
        this.draw()
    }
}