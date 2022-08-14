class Piece {
    static piecesCreated = 0
    constructor(type, isWhite, position) {
        if (!peicesNames.includes(type)) {
            throw new Error(`"${type}" is not a peice in chess`)
        }
        Piece.piecesCreated += 1
        this.positions = []
        this.lastPosition = null
        this.notMoved = true
        this.isFirstMove = false
        this.isAlive = true
        this.type = type
        this.isWhite = isWhite
        this.position = position
        this.ex = isWhite ? "w" : "b"
        this.color = isWhite ? "white" : "black"
        this.imageSrc = `imgs/${this.ex}_${this.type}.png`
        
        board[this.position].isFull = true
        board[this.position].piece = this
        this.draw()
    }
    set onclick(func) {
        board[this.position].onclick = func
    }
    //draw peices in the board
    draw() {
        board[this.position].isFull = true
        board[this.position].piece = this
        board[this.position].html.style.backgroundImage = `url(${this.imageSrc})`
    }
    //erase peices in the board
    erase() {
        board[this.position].isFull = false
        board[this.position].piece = null
        board[this.position].html.style.backgroundImage = ``
        board[this.position].onclick = () => { }
    }
    //earse peice and draw it in new place
    moveTo(newPosition) {
        this.isFirstMove = this.notMoved
        this.erase()
        this.notMoved = false
        if (this.type === "pawn") {
            if (isOn(squaresMove(newPosition, 1, 0)) && board[squaresMove(newPosition, 1, 0)].isFull && board[squaresMove(newPosition, 1, 0)].piece.type === "pawn") {
                this.isPawnRightWhenMoved = true
            }
            if (isOn(squaresMove(newPosition, -1, 0)) && board[squaresMove(newPosition, -1, 0)].isFull && board[squaresMove(newPosition, -1, 0)].piece.type === "pawn") {
                this.isPawnLeftWhenMoved = true
            }
        }
        this.lastPosition = this.position
        this.position = newPosition
        this.draw()
    }
}