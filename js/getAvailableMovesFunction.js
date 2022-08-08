function getavailableMovesFunction(piece) {
    let move = (x, y) => {
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
    //pawn moves function
    if (piece.type === "pawn") {
        let yDirection = piece.isWhite ? 1 : -1
        let ySpecial = piece.isWhite ? "5" : "4"
        return () => {
            let availableMoves = []
            let front = squaresMove(piece.position, 0, yDirection)
            let right = squaresMove(piece.position, 1, yDirection)
            let left = squaresMove(piece.position, -1, yDirection)
            let specialKillLeft = squaresMove(piece.position, -1, 0)
            let specialKillRight = squaresMove(piece.position, 1, 0)
            let specialMoveLeft = squaresMove(piece.position, -1, yDirection)
            let specialMoveRight = squaresMove(piece.position, 1, yDirection)
            if (piece.notMoved) {
                let superFront = squaresMove(piece.position, 0, 2 * yDirection)
                if (isOn(superFront) && !board[superFront].isFull && !board[front].isFull) {
                    availableMoves.push(superFront)
                }
            }
            if (isOn(front) && !board[front].isFull) {
                availableMoves.push(front)
            }
            if (isOn(right) && board[right].isFull && board[right].piece.isWhite != piece.isWhite) {
                availableMoves.push(right)
            }
            if (isOn(left) && board[left].isFull && board[left].piece.isWhite != piece.isWhite) {
                availableMoves.push(left)
            }
            if (piece.pawnSpeicalKill.left && isOn(specialKillLeft) && piece.position[1] === ySpecial & board[specialKillLeft].isFull) {
                let leftPawn = board[specialKillLeft].piece
                if (leftPawn.isWhite !== piece.isWhite
                    && leftPawn.isPawnRightWhenMoved && leftPawn.isFirstMove
                    && leftPawn.positions[leftPawn.positions.length - 1] !== leftPawn.positions[leftPawn.positions.length - 2]
                ) {
                    availableMoves.push(squaresMove(piece.position, -1, yDirection))
                    specialMoves["pawnKill"] = {
                        condition: (selectedPosition) => (selectedPosition == specialMoveLeft && selectedPiece === piece),
                        action: () => {
                            killIt(leftPawn)
                        }
                    }
                }
            }
            if (piece.pawnSpeicalKill.right && isOn(specialKillRight) && piece.position[1] === ySpecial & board[specialKillRight].isFull) {
                let rightPawn = board[specialKillRight].piece
                if (rightPawn.isWhite !== piece.isWhite
                    && rightPawn.isPawnLeftWhenMoved && rightPawn.isFirstMove
                    && rightPawn.positions[rightPawn.positions.length - 1] !== rightPawn.positions[rightPawn.positions.length - 2]
                ) {
                    availableMoves.push(squaresMove(piece.position, 1, yDirection))
                    specialMoves["pawnKill"] = {
                        condition: (selectedPosition) => (selectedPosition == specialMoveRight && selectedPiece === piece),
                        action: () => {
                            killIt(rightPawn)
                        }
                    }
                }
            }
            return availableMoves
        }
    } else if (piece.type === "rook") {
        return () => [...move(0, 1), ...move(0, -1), ...move(-1, 0), ...move(1, 0)]
    } else if (piece.type === "bishop") {
        return () => [...move(1, 1), ...move(1, -1), ...move(-1, 1), ...move(-1, -1)]
    } else if (piece.type === "queen") {
        return () => [...move(1, 1), ...move(1, -1), ...move(-1, 1), ...move(-1, -1), ...move(0, 1), ...move(0, -1), ...move(-1, 0), ...move(1, 0)]
    } else if (piece.type === "knight") {
        return () => {
            let availableMoves = []
            const position = piece.position
            let moves = [[2, 1], [2, -1], [-2, 1], [-2, -1], [1, 2], [-1, 2], [1, -2], [-1, -2]]
            for (let i = 0; i < moves.length; i++) {
                let move = squaresMove(position, moves[i][0], moves[i][1])
                if (isOn(move)) {
                    if (board[move].isFull && board[move].piece.isWhite !== piece.isWhite) {
                        availableMoves.push(move)
                    } else if (!board[move].isFull)
                        availableMoves.push(move)
                }
            }
            return availableMoves
        }
    } else if (piece.type === "king") {
        return () => {
            const position = piece.position
            let availableMoves = []
            let moves = [[1, 0], [0, 1], [1, 1], [-1, -1], [-1, 0], [0, -1], [-1, 1], [1, -1]]
            for (let i = 0; i < moves.length; i++) {
                let move = squaresMove(position, moves[i][0], moves[i][1])
                if (isOn(move)) {
                    if (board[move].isFull && board[move].piece.isWhite !== piece.isWhite) {
                        availableMoves.push(move)
                    } else if (!board[move].isFull) {
                        availableMoves.push(move)
                    }
                }
            }
            let rookPosition = piece.isWhite ? "h1" : "h8"
            delete specialMoves["kingMove"]
            if (board[rookPosition].isFull && board[rookPosition]
                && board[rookPosition].isFull
                && piece.position === squaresMove(rookPosition, -3, 0)
                && !board[squaresMove(position, 1, 0)].isFull
                && !board[squaresMove(position, 2, 0)].isFull
                && board[rookPosition].piece.notMoved
                && piece.notMoved) {
                availableMoves.push(squaresMove(position, 2, 0))
                specialMoves["kingMove"] = {
                    condition: (selectedPosition) => (
                        selectedPosition === squaresMove(position, 2, 0)
                        && selectedPiece.type === "king"),
                    action: () => {
                        let rookPosition = piece.isWhite ? "h1" : "h8"
                        board[rookPosition].piece.moveTo(squaresMove(rookPosition, -2, 0))
                    }
                }
            }
            rookPosition = piece.isWhite ? "a1" : "a8"
            if (board[rookPosition].isFull && board[rookPosition]
                && board[rookPosition].isFull
                && piece.position === squaresMove(rookPosition, 4, 0)
                && !board[squaresMove(position, -1, 0)].isFull
                && !board[squaresMove(position, -2, 0)].isFull
                && !board[squaresMove(position, -3, 0)].isFull
                && board[rookPosition].piece.notMoved
                && piece.notMoved) {
                availableMoves.push(squaresMove(position, -2, 0))
                specialMoves["kingMove"] = {
                    condition: (selectedPosition) => (
                        selectedPosition === squaresMove(position, -2, 0)
                        && selectedPiece.type === "king"),
                    action: () => {
                        let rookPosition = piece.isWhite ? "a1" : "a8"
                        board[rookPosition].piece.moveTo(squaresMove(rookPosition, 3, 0))
                    }
                }
            }
            return availableMoves
        }
    }
}