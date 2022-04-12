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
	const player1 = Player('Dave', 'computer');
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
