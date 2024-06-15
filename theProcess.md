I'm very proud of this project, as the only concept that I borrowed was in using linked lists. The rest was solved on a whiteboard and with trial and error. 

Net time invested: 17 hours

I started with one class: board

board was given functions: 
  1. that removed illegal moves(based soley on range of graph)
  2. search was based on legal moves returned from aforementioned function.
      Only other condition was to limit search to 7, as any square can be reached on a board in 6 moves or less.
  3. function worked... eventually. After 3 mins the search would end, 
      and right answer retrieved. Mission failed SUCCESSFULLY. 

run time: 1.6 seconds - Node  
>3 seconds - browser
AWFUL!

2nd attempt:
  1. create board class that accepts key of coordinates.toString(). item is coordinates. 
  2. current square is plugged into valid move formula. Each move is turned into a string, and key is plugged into board. If undefined, square has not yet been occupied, so move is valid(considering other previous parameters are met.)
  3. this.optimal added to board class to reference the shortest path.
    If shorter path is found, this.optimal is updated.
  4. recursive function is given count = 0, and count ++ every recursion.
    if count < to this.optimal or this.optimal === undefined, search continues.

  Node runtime: 0.105 seconds - shaving off 1.529 seconds.. or over 1500% better. But still needs a lot of improvement.

3rd reworking w/ final breakthrough: (Whiteboards save lives)
  final worst case ([0,0] -> [7,7]) run time (node) is: 
  0.079 seconds
  0.065 seconds
  0.069 seconds

  avg runtime: 0.071 seconds

  The hurdle was tracking pathways from start to finish. With so many searches branching from the start, the solution as to how to isolate the optimal path escaped me. I tried implementing an array.push() in my recursion, but realized that the relevant path was scattered among dozens of coordinates that had pushed in the meantime.
  
  What I realized is that each square can only be occupied once, so while the outword search from any single square could be hundreds of routes, the route backwards can only be one. As long as the route endpoint is known, you can find your way to the start. So, "this.root" was updated to keep the represented coordinates required to indicate that the square has been occupied, and I added a previous square key/item to the addSquare() function. The key of each object is also just the coordinates converted to a string for ease of access.

  So, path() updates the "previous" value to "current" and defaults previous to null, which is strictly applied to the starting point. (shoutout to linked lists!)
  After each recursive path() call has been made, createPathArray() is called, where the initial key is the end value converted to string. The key retrieves the object, 
  object.coordinates are pushed to this.optimalPath array, and the key is updated to have a value of object.lastSquare. The recursion continues until the null value is encountered. Then the array order is reversed and ready to present.