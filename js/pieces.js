let pieceMove = (x, y ,piece) => {
    let availableMoves = []
    let currentPoint = squaresMove(piece.position, x, y)
    while (isOn(currentPoint) && !board[currentPoint].isFull) {
        availableMoves.push(currentPoint)
        currentPoint = squaresMove(currentPoint, x, y)
    }
    if (isOn(currentPoint) && board[currentPoint].isFull && board[currentPoint].piece.isWhite !== piece.isWhite) {
        availableMoves.push(currentPoint)
    }
    return availableMoves
}
class Pawn extends Piece{
    constructor(isWhite,position){
        super("pawn",isWhite,position)
        this.pawnSpeicalKill = { left: true, right: true }
        this.ySpecial = this.isWhite ? "5" : "4"
        this.yDerection = this.isWhite ? 1 : -1
    }
    getavailableMoves(){
        let availableMoves = []
        let front = squaresMove(this.position, 0, this.yDerection)
        let right = squaresMove(this.position, 1, this.yDerection)
        let left = squaresMove(this.position, -1, this.yDerection)
        let specialKillLeft = squaresMove(this.position, -1, 0)
        let specialKillRight = squaresMove(this.position, 1, 0)
        let specialMoveLeft = squaresMove(this.position, -1, this.yDerection)
        let specialMoveRight = squaresMove(this.position, 1, this.yDerection)
        if (this.notMoved) {
            let superFront = squaresMove(this.position, 0, 2 * this.yDerection)
            if (isOn(superFront) && !board[superFront].isFull && !board[front].isFull) {
                availableMoves.push(superFront)
            }
        }
        if (isOn(front) && !board[front].isFull) {
            availableMoves.push(front)
        }
        if (isOn(right) && board[right].isFull && board[right].piece.isWhite != this.isWhite) {
            availableMoves.push(right)
        }
        if (isOn(left) && board[left].isFull && board[left].piece.isWhite != this.isWhite) {
            availableMoves.push(left)
        }
        if (this.pawnSpeicalKill.left && isOn(specialKillLeft) && this.position[1] === this.ySpecial & board[specialKillLeft].isFull) {
            let leftPawn = board[specialKillLeft].piece
            if (leftPawn.isWhite !== this.isWhite
                && leftPawn.isPawnRightWhenMoved && leftPawn.isFirstMove
                && leftPawn.positions[leftPawn.positions.length - 1] !== leftPawn.positions[leftPawn.positions.length - 2]
            ) {
                availableMoves.push(squaresMove(this.position, -1, this.yDerection))
                specialMoves["pawnKill"] = {
                    condition: (selectedPosition) => (selectedPosition == specialMoveLeft && selectedPiece === this),
                    action: () => {
                        killIt(leftPawn)
                    }
                }
            }
        }
        if (this.pawnSpeicalKill.right && isOn(specialKillRight) && this.position[1] === this.ySpecial & board[specialKillRight].isFull) {
            let rightPawn = board[specialKillRight].piece
            if (rightPawn.isWhite !== this.isWhite
                && rightPawn.isPawnLeftWhenMoved && rightPawn.isFirstMove
                && rightPawn.positions[rightPawn.positions.length - 1] !== rightPawn.positions[rightPawn.positions.length - 2]
            ) {
                availableMoves.push(squaresMove(this.position, 1, this.yDerection))
                specialMoves["pawnKill"] = {
                    condition: (selectedPosition) => (selectedPosition == specialMoveRight && selectedPiece === this),
                    action: () => {
                        killIt(rightPawn)
                    }
                }
            }
        }
        return availableMoves
    }
}



class Rook extends Piece{
    constructor(isWhite,position){
        super("rook",isWhite,position)
    }
    getavailableMoves(){
        let move=(x,y)=>pieceMove(x,y,this)
        return [...move(0, 1), ...move(0, -1), ...move(-1, 0), ...move(1, 0)]
    }
}


class Knight extends Piece{
    constructor(isWhite,position){
        super("knight",isWhite,position)
    }
    getavailableMoves(){
        let availableMoves = []
        const position = this.position
        let moves = [[2, 1], [2, -1], [-2, 1], [-2, -1], [1, 2], [-1, 2], [1, -2], [-1, -2]]
        for (let i = 0; i < moves.length; i++) {
            let move = squaresMove(position, moves[i][0], moves[i][1])
            if (isOn(move)) {
                if (board[move].isFull && board[move].piece.isWhite !== this.isWhite) {
                    availableMoves.push(move)
                } else if (!board[move].isFull)
                    availableMoves.push(move)
            }
        }
        return availableMoves
    }
}



class Bishop extends Piece{
    constructor(isWhite,position){
        super("bishop",isWhite,position)
    }
    getavailableMoves(){
        let move=(x,y)=>pieceMove(x,y,this)
        return [...move(1, 1), ...move(1, -1), ...move(-1, 1), ...move(-1, -1)]
    }
}



class Queen extends Piece{
    constructor(isWhite,position){
        super("queen",isWhite,position)
    }
    getavailableMoves(){
        let move=(x,y)=>pieceMove(x,y,this)
        return [...move(0, 1), ...move(0, -1), ...move(-1, 0), ...move(1, 0),...move(1, 1), ...move(1, -1), ...move(-1, 1), ...move(-1, -1)]
    }
}



class King extends Piece{
    constructor(isWhite,position){
        super("king",isWhite,position)
    }
    getavailableMoves(){
        const position = this.position
        let availableMoves = []
        let moves = [[1, 0], [0, 1], [1, 1], [-1, -1], [-1, 0], [0, -1], [-1, 1], [1, -1]]
        for (let i = 0; i < moves.length; i++) {
            let move = squaresMove(position, moves[i][0], moves[i][1])
            if (isOn(move)) {
                if (board[move].isFull && board[move].piece.isWhite !== this.isWhite) {
                    availableMoves.push(move)
                } else if (!board[move].isFull) {
                    availableMoves.push(move)
                }
            }
        }
        let rookPosition = this.isWhite ? "h1" : "h8"
        delete specialMoves["kingMove"]
        if (board[rookPosition].isFull && board[rookPosition]
            && board[rookPosition].isFull
            && this.position === squaresMove(rookPosition, -3, 0)
            && !board[squaresMove(position, 1, 0)].isFull
            && !board[squaresMove(position, 2, 0)].isFull
            && board[rookPosition].piece.notMoved
            && this.notMoved) {
            availableMoves.push(squaresMove(position, 2, 0))
            specialMoves["kingMove"] = {
                condition: (selectedPosition) => (
                    selectedPosition === squaresMove(position, 2, 0)
                    && selectedPiece.type === "king"),
                action: () => {
                    let rookPosition = this.isWhite ? "h1" : "h8"
                    board[rookPosition].piece.moveTo(squaresMove(rookPosition, -2, 0))
                }
            }
        }
        rookPosition = this.isWhite ? "a1" : "a8"
        if (board[rookPosition].isFull && board[rookPosition]
            && board[rookPosition].isFull
            && this.position === squaresMove(rookPosition, 4, 0)
            && !board[squaresMove(position, -1, 0)].isFull
            && !board[squaresMove(position, -2, 0)].isFull
            && !board[squaresMove(position, -3, 0)].isFull
            && board[rookPosition].piece.notMoved
            && this.notMoved) {
            availableMoves.push(squaresMove(position, -2, 0))
            specialMoves["kingMove"] = {
                condition: (selectedPosition) => (
                    selectedPosition === squaresMove(position, -2, 0)
                    && selectedPiece.type === "king"),
                action: () => {
                    let rookPosition = this.isWhite ? "a1" : "a8"
                    board[rookPosition].piece.moveTo(squaresMove(rookPosition, 3, 0))
                }
            }
        }
        return availableMoves
    }
}