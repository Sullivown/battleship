import gameController from '../modules/gameController';
import Player from './Player';
import Gameboard from './Gameboard';
import Ship from './Ship';

test('Player creation', () => {
	const player1 = Player('Dave', 'human');
	expect(player1.getName()).toBe('Dave');
	expect(player1.getType()).toBe('human');
});

test('Make attack - human', () => {
	const player1 = Player('Dave', 'human');
	const player2 = Player('Athena', 'human');

	const attackCoordsX = 0;
	const attackCoordsY = 0;

	player2.board = Gameboard(10);

	const testShip = Ship(0, 5);
	player2.board.placeShip({
		ship: testShip,
		coordinates: { x: attackCoordsX, y: attackCoordsY },
		verticalAlignment: false,
	});

	player1.attack(player2, { x: attackCoordsX, y: attackCoordsY });
	const p2board = player2.board.getBoard();

	expect(p2board[attackCoordsX][attackCoordsY].shotFired).toBe(true);
	expect(p2board[attackCoordsX][attackCoordsY].ship.getHits()[0]).toBe(true);
});

test('Make attack - computer', () => {
	const player1 = Player('Dave', 'ai');
	const player2 = Player('Athena', 'human');
	const attackCoords = player1.getAIMove(10);
	const testShip = Ship(0, 1);

	player2.board = Gameboard(10);
	player2.board.placeShip({
		ship: testShip,
		coordinates: { x: attackCoords.x, y: attackCoords.y },
		verticalAlignment: false,
	});

	player1.attack(player2, { x: attackCoords.x, y: attackCoords.y });
	const p2board = player2.board.getBoard();

	expect(p2board[attackCoords.x][attackCoords.y].shotFired).toBe(true);
	expect(p2board[attackCoords.x][attackCoords.y].ship.getHits()[0]).toBe(
		true
	);
});

test('AI ship placement', () => {
	const SHIPS = [2, 3, 3, 4, 5];
	const player1 = Player('Muscavado', 'ai');
	player1.board = Gameboard(10);
	player1.shipyard = gameController.createShipyard(SHIPS);
	player1.placeAIShips(player1.shipyard, player1.board);

	const totalCellsWithShips = player1.board
		.getBoard()
		.reduce((prev, curr) => {
			let rowTotal = 0;
			for (let i = 0; i < curr.length; i++) {
				if (curr[i].ship != null) {
					rowTotal += 1;
				}
			}
			return prev + rowTotal;
		}, 0);

	expect(player1.shipyard).toEqual([null, null, null, null, null]);
	expect(totalCellsWithShips).toBe(17);
});
