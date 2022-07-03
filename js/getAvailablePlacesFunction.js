function getAvailablePlacesFunction(piece) {
    let move = (x, y) => {
        let availablePlaces = []
        let currentPoint = squaresMove(piece.position, x, y)
        while (isOn(currentPoint) && !board[currentPoint].isFull) {
            availablePlaces.push(currentPoint)
            currentPoint = squaresMove(currentPoint, x, y)
        }
        if (isOn(currentPoint) && board[currentPoint].isFull && board[currentPoint].piece.isWhite !== piece.isWhite) {
            availablePlaces.push(currentPoint)
        }
        return availablePlaces
    }
    if (piece.type === "pawn") {
        if (piece.isWhite) {
            return () => {
                let avaliblePlace = []
                let front = squaresMove(piece.position, 0, 1)
                let right = squaresMove(piece.position, 1, 1)
                let left = squaresMove(piece.position, -1, 1)
                if (piece.isFirstMove) {
                    let superFront = squaresMove(piece.position, 0, 2)
                    if (isOn(superFront) && !board[superFront].isFull && !board[front].isFull) {
                        avaliblePlace.push(superFront)
                    }
                }
                if (isOn(front) && !board[front].isFull&&!isCheckTest) {
                    avaliblePlace.push(front)
                }
                if ((isOn(right) && board[right].isFull && !board[right].piece.isWhite)||isCheckTest) {
                    avaliblePlace.push(right)
                }
                if ((isOn(left) && board[left].isFull && !board[left].piece.isWhite)||isCheckTest) {
                    avaliblePlace.push(left)
                }
                return avaliblePlace
            }
        } else {
            return () => {
                let avaliblePlace = []
                let front = squaresMove(piece.position, 0, -1)
                let right = squaresMove(piece.position, 1, -1)
                let left = squaresMove(piece.position, -1, -1)
                if (piece.isFirstMove) {
                    let superFront = squaresMove(piece.position, 0, -2)
                    if (isOn(superFront) && !board[superFront].isFull && !board[front].isFull&&!isCheckTest) {
                        avaliblePlace.push(superFront)
                    }
                }
                if (isOn(front) && !board[front].isFull&&!isCheckTest) {
                    avaliblePlace.push(front)
                }
                if ((isOn(right) && board[right].isFull && board[right].piece.isWhite)||isCheckTest) {
                    avaliblePlace.push(right)
                }
                if ((isOn(left) && board[left].isFull && board[left].piece.isWhite)||isCheckTest) {
                    avaliblePlace.push(left)
                }
                return avaliblePlace
            }
        }
    } else if (piece.type === "rook") {
        return () => [...move(0, 1), ...move(0, -1), ...move(-1, 0), ...move(1, 0)]
    } else if (piece.type === "bishop") {
        return () => [...move(1, 1), ...move(1, -1), ...move(-1, 1), ...move(-1, -1)]
    } else if (piece.type === "queen") {
        return () => [...move(1, 1), ...move(1, -1), ...move(-1, 1), ...move(-1, -1), ...move(0, 1), ...move(0, -1), ...move(-1, 0), ...move(1, 0)]
    } else if (piece.type === "knight") {
        return () => {
            let availablePlaces = []
            const position = piece.position
            let moves = [[2, 1], [2, -1], [-2, 1], [-2, -1], [1, 2], [-1, 2], [1, -2], [-1, -2]]
            for (let i = 0; i < moves.length; i++) {
                let move = squaresMove(position, moves[i][0], moves[i][1])
                if (isOn(move)) {
                    if (board[move].isFull && board[move].piece.isWhite !== piece.isWhite) {
                        availablePlaces.push(move)
                    } else if (!board[move].isFull)
                        availablePlaces.push(move)
                }
            }
            return availablePlaces
        }
    } else if (piece.type === "king") {
        return () => {
            const position = piece.position
            let availablePlaces = []
            let moves = [[1, 0], [0, 1], [1, 1], [-1, -1], [-1, 0], [0, -1], [-1, 1], [1, -1]]
            for (let i = 0; i < moves.length; i++) {
                let move = squaresMove(position, moves[i][0], moves[i][1])
                if (isOn(move)) {
                    if (board[move].isFull && board[move].piece.isWhite !== piece.isWhite) {
                        availablePlaces.push(move)
                    } else if (!board[move].isFull) {
                        availablePlaces.push(move)
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
                && board[rookPosition].piece.isFirstMove
                && piece.isFirstMove) {
                availablePlaces.push(squaresMove(position, 2, 0))
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
                && board[rookPosition].piece.isFirstMove
                && piece.isFirstMove) {
                availablePlaces.push(squaresMove(position, -2, 0))
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
            return availablePlaces
        }
    }
}