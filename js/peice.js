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
        this.positions=[]
        this.lastPosition=null
        this.notMoved=true
        this.isFirstMove=false
        this.isAlive=true
        this.type = type
        this.isWhite = isWhite
        this.position = position
        this.ex = isWhite ? "w" : "b"
        this.color = isWhite ? "white" : "black"
        this.imageSrc = `imgs/${this.ex}_${this.type}.png`
        this.getavailableMoves=getavailableMovesFunction(this)
        this.square=board[this.position]
        this.square.isFull = true
        this.square.piece = this
        this.draw()
        delete this.getavailableMovesFunction
    }
    set onclick(func){
        board[this.position].onclick=func
    }
    //draw peices in the board
    draw(drawInHtml=true) {
        board[this.position].isFull = true
        board[this.position].piece = this
        if(drawInHtml){board[this.position].html.innerHTML = `<img src="${this.imageSrc}">`}
    }
    //erase peices in the board
    erase(earseInHtml=true) {
        board[this.position].isFull = false
        board[this.position].piece = null
        if(earseInHtml){
            board[this.position].html.innerHTML = ""
            board[this.position].onclick=()=>{}
        }
    }
    //earse peice and draw it in new place
    moveTo(newPosition,drawInHtml=true,earseInHtml=true) {
        this.isFirstMove=this.notMoved
        this.erase(earseInHtml)
        this.notMoved=false
        if(this.type==="pawn"){
            if(isOn(squaresMove(newPosition,1,0))&&board[squaresMove(newPosition,1,0)].isFull&&board[squaresMove(newPosition,1,0)].piece.type==="pawn"){
                this.isPawnRightWhenMoved=true
            }
            if(isOn(squaresMove(newPosition,-1,0))&&board[squaresMove(newPosition,-1,0)].isFull&&board[squaresMove(newPosition,-1,0)].piece.type==="pawn"){
                this.isPawnLeftWhenMoved=true
            }
        }
        this.lastPosition=this.position
        this.position = newPosition
        this.square=board[this.position]
        this.draw(drawInHtml)
    }
}