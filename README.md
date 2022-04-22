# Battleship

A recreation of the classic [Battleship game](<https://en.wikipedia.org/wiki/Battleship_(game)>) as part of [The Odin Project](https://www.theodinproject.com/lessons/node-path-javascript-battleship) course.

## How to Play

Players can choose to play against the AI or another human player.

### Game Setup

Players can input player names and choose to play against another human player or the AI (you can also choose to have AI vs AI and see how the battle plays out!).

### Placement Phase

Players take turns to place their ships on their board. To place a ship, select it by clicking on it and then clicking a valid square on your board. Press the 'Switch Alignment' button or hit the `SPACEBAR` to change the alignment of a ship.

### Battle Phase

Click a square on the opponent's board. If you miss, the other player takes their turn. If you hit, you immediately get to take another turn! Play continues until one player has sunk all of their opponent's ships.

## Learning Objectives

Putting the many techniques into practice and implement the solution using the various tools learnt about in the course so far. My main learning objectives for this project were:

-   [Test Driven Development](https://en.wikipedia.org/wiki/Test-driven_development): using [Jest](https://jestjs.io/) to implement the testing process.
-   [SOLID Design Principles](https://en.wikipedia.org/wiki/SOLID): continuing to adhere to the design principles, in particular de-coupling the game logic from the UI.

## Future Improvements

-   A more advanced AI. Specifically one that 'makes decisions' based on multiple vertical or horizontal hits to increase the odds of sinking a ship.
