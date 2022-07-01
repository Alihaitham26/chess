class Piece {
    static piecesCreated = 0
    getAvailablePlacesFunction(){
        let move=(x,y)=>{
            let availablePlaces=[]
            let currentPoint=squaresMove(this.position,x,y)
            while(isOn(currentPoint)&&!board[currentPoint].isFull){
                availablePlaces.push(currentPoint)
                currentPoint=squaresMove(currentPoint,x,y)
            }
            if(isOn(currentPoint)&&board[currentPoint].isFull&&board[currentPoint].piece.isWhite!==this.isWhite){
                availablePlaces.push(currentPoint)
            }
            return availablePlaces                   
        }
        if(this.type==="pawn"){
            if(this.isWhite){
                return ()=>{
                    let avaliblePlace=[]
                    let front=squaresMove(this.position,0,1)
                    let right=squaresMove(this.position,1,1)
                    let left=squaresMove(this.position,-1,1)
                    if(this.isFirstMove){
                        let superFront=squaresMove(this.position,0,2)
                        if(isOn(superFront)&&!board[superFront].isFull&&!board[front].isFull){
                            avaliblePlace.push(superFront)
                        }
                    }
                    if(isOn(front)&&!board[front].isFull){
                        avaliblePlace.push(front)
                    }
                    if(isOn(right)&&board[right].isFull&&!board[right].piece.isWhite){
                        avaliblePlace.push(right)
                    }
                    if(isOn(left)&&board[left].isFull&&!board[left].piece.isWhite){
                        avaliblePlace.push(left)
                    }
                    return avaliblePlace
                }
            }else{
                return ()=>{
                    let avaliblePlace=[]
                    let front=squaresMove(this.position,0,-1)
                    let right=squaresMove(this.position,1,-1)
                    let left=squaresMove(this.position,-1,-1)
                    if(this.isFirstMove){
                        let superFront=squaresMove(this.position,0,-2)
                        if(isOn(superFront)&&!board[superFront].isFull&&!board[front].isFull){
                            avaliblePlace.push(superFront)
                        }
                    }
                    if(isOn(front)&&!board[front].isFull){
                        avaliblePlace.push(front)
                    }
                    if(isOn(right)&&board[right].isFull&&board[right].piece.isWhite){
                        avaliblePlace.push(right)
                    }
                    if(isOn(left)&&board[left].isFull&&board[left].piece.isWhite){
                        avaliblePlace.push(left)
                    }
                    return avaliblePlace
                }
            }
        }else if(this.type==="rook"){
            return ()=>[...move(0,1),...move(0,-1),...move(-1,0),...move(1,0)]
        }else if(this.type==="bishop"){
            return ()=>[...move(1,1),...move(1,-1),...move(-1,1),...move(-1,-1)]
        }else if(this.type==="queen"){
            return ()=>[...move(1,1),...move(1,-1),...move(-1,1),...move(-1,-1),...move(0,1),...move(0,-1),...move(-1,0),...move(1,0)]
        }else if(this.type==="knight"){
            return()=>{
                let availablePlaces=[]
                const position=this.position
                let moves=[[2,1],[2,-1],[-2,1],[-2,-1],[1,2],[-1,2],[1,-2],[-1,-2]]
                for(let i=0;i<moves.length;i++){
                    let move=squaresMove(position,moves[i][0],moves[i][1])
                    if(isOn(move)){
                        if(board[move].isFull&&board[move].piece.isWhite!==this.isWhite){
                            availablePlaces.push(move)
                        }else if(!board[move].isFull)
                        availablePlaces.push(move)
                    }
                }
                return availablePlaces
            }
        }else if(this.type==="king"){
            return ()=>{
                const position=this.position
                let availablePlaces=[]
                let moves=[[1,0],[0,1],[1,1],[-1,-1],[-1,0],[0,-1],[-1,1],[1,-1]]
                for(let i=0;i<moves.length;i++){
                    let move=squaresMove(position,moves[i][0],moves[i][1])
                    if(isOn(move)){
                        if(board[move].isFull&&board[move].piece.isWhite!==this.isWhite){
                            availablePlaces.push(move)
                        }else if(!board[move].isFull){
                            availablePlaces.push(move)
                        }
                    }
                }
                // let rookPosition=squaresMove(position,3,0)
                // console.log(rookPosition)
                // if(isOn(rookPosition)&&rookPosition[1]===this.isWhite?"1":"8"
                // &&board[rookPosition].isFull
                // &&board[squaresMove(position,3,0)].piece.type==="rook"
                // &&board[squaresMove(position,3,0)].piece.isWhite===this.isWhite
                // &&board[!squaresMove(position,1,0).isFull]
                // &&board[!squaresMove(position,2,0).isFull]
                // ){
                //     availablePlaces.push(squaresMove(position,2,0))
                // }
                return availablePlaces        
            }
        }
    }
    constructor(type, isWhite, position) {
        Piece.piecesCreated+=1
        if(!peicesNames.includes(type)){
            throw new Error(`"${type}" is not a peice in chess`)
        }
        if(type==="pawn"){
            this.isFirstMove=true
        }
        this.isAlive=true
        this.type = type
        this.isWhite = isWhite
        this.position = position
        this.ex = isWhite ? "w" : "b"
        this.color = isWhite ? "white" : "black"
        this.imageSrc = `imgs/${this.ex}_${this.type}.png`
        this.getAvailablePlaces=this.getAvailablePlacesFunction()
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
        this.erase()
        this.isFirstMove=false
        this.position = newPosition
        this.square=board[this.position]
        this.draw()
    }
    //get available places function
}