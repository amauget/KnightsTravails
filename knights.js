class Board{
  constructor(root = {}){
    this.root = root
    this.optimal = undefined /* is updated with optimal move count */
    this.optimalPath = []
  }
  dispatch(start, end){
    this.checkRange(start, end) /* checks input ranges for validity */
    this.path(start, end) 
    this.createPathArray(end)
    this.output(start, end)
  }
  addSquare(coordinates,count, lastSquare = null){ 
    let key = coordinates.toString()
    this.root[key] = {coordinates: coordinates, count: count, lastSquare: lastSquare}
    /* creating the obj means it has been occupied
      coordinates are for pushing to the final path array
      lastSquare is for routing the relevant path array coordinates via end -> start
    */
    return this.root
  }
  legalMoves(position, endSquare){
    let moves = [
      [position[0] + 2, position[1] - 1],
      [position[0] + 2, position[1] + 1],
      [position[0] + 1, position[1] - 2],
      [position[0] + 1, position[1] + 2],
      [position[0] - 1, position[1] - 2],
      [position[0] - 1, position[1] + 2],
      [position[0] - 2, position[1] - 1],
      [position[0] - 2, position[1] + 1],
    ]
    let feasibleMoves = []
    for(let i = 0; i < moves.length; i++){
      let proposedMove = moves[i]
      let key = moves[i].toString()

      let xMove = proposedMove[0], yMove = proposedMove[1]
      
      if(xMove >= 0 && xMove <= 7 && yMove >= 0 && yMove <= 7){ /* maintains bounds of board */
        if(this.root[key] === undefined || xMove === endSquare[0] && yMove === endSquare[1]){ /* seeks key to verify that square hasn't been visited unless square is the end destination */
          feasibleMoves.push(proposedMove)
         
        }
      }
    }

    return feasibleMoves
  }
  path(current, end, count = 0, previous = null){
/*     if(count > 6){ return /* catching virtually all contingencies  }*/
 
    if((count < this.optimal || this.optimal === undefined) && count < 7){ /* How can I isolate pathway to each specific route, instead of all iterations with count < this.optimal? */
      let legalMoves = this.legalMoves(current, end)

        this.addSquare(current,count, previous) /* adds current square to list of places visited. */
      if(end[0] === current[0] && end[1] === current[1]){/* all squares on board can be accessed in 6 or less moves. */
        this.optimizedUpdate(count)
        let key = end.toString()
        this.root[key].lastSquare = previous /* updates ends square "lastSquare" if a more optimal path is found */
      }
      
      else{
        count ++
        previous = current /* Defining Previous here allows updated previous to be the parent of all iterated values in loop below. */
        for(let i = 0; i < legalMoves.length; i++){
          this.path(legalMoves[i], end, count, previous)
        }
      }  
    }
    else{ return }
  }
  checkRange(start, end){
    let startX = start[0], startY = start[1]
    let endX = end[0], endY = end[1]

    if ((startX < 0 || startX > 7 || startY < 0 || startY > 7)||(endX < 0 || endX > 7 || endY < 0 || endY > 7)){  
      throw new Error("Coordinates must be between 0 and 7.");
    }
  }
  createPathArray(key, count = 0){ /* Where "key" is the targetted destination square */

    if(count === 0){
      this.optimalPath.push(key)
    }
    key = key.toString()
    let obj = this.root[key]

    let parent = obj.lastSquare

    if(parent === null){
      this.optimalPath.reverse()
    }
    else{
      this.optimalPath.push(parent)

      let newKey = parent
      count ++
      this.createPathArray(newKey, count)
    }
  }
  optimizedUpdate(count){
    this.optimal = count
    return this
  }
  output(start, end){
    let length = this.root[`${end}`].count
 
    console.log(`[${start}] to [${end}] can be achieved in ${length} move(s): `)   
    console.log(this.optimalPath)
  }
}


function init(){ /* The only Board function designed for exterior access is "dispatch()" */
  let board = new Board()
  let start = [3,3], end = [3,2]
  board.dispatch(start, end)
}

init()