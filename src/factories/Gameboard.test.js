import Gameboard from './Gameboard';
import Ship from './Ship';

test('Gameboard Creation', () => {
	let board = Gameboard();
	let testBoard = [[], [], [], [], [], [], [], [], [], []];

	testBoard.forEach((element) => {
		for (let i = 0; i < 10; i++) {
			element.push({
				shotFired: false,
				ship: null,
			});
		}
	});
	expect(board.getBoard()).toEqual(testBoard);
});

test('Ship placement vertical', () => {
	let board = Gameboard();
	const testShip = Ship(3);
	const x = 1;
	const y = 3;

	board.placeShip({
		ship: testShip,
		coordinates: { x, y },
		verticalAlignment: true,
	});
	for (let i = 0, shipLength = testShip.getLength(); i < shipLength; i++) {
		expect(board.getBoard()[x][y + i]).toEqual({
			shotFired: false,
			ship: testShip,
			shipSection: i,
		});
	}
});

test('Ship placement horizontal', () => {
	let board = Gameboard();
	const testShip = Ship(5);
	const x = 3;
	const y = 0;
	board.placeShip({
		ship: testShip,
		coordinates: { x, y },
		verticalAlignment: false,
	});
	for (let i = 0, shipLength = testShip.getLength(); i < shipLength; i++) {
		expect(board.getBoard()[x + i][y]).toEqual({
			shotFired: false,
			ship: testShip,
			shipSection: i,
		});
	}
});

test('Ship placement invalid catch', () => {
	let board = Gameboard();
	const testShip = Ship(15);
	const x = 0;
	const y = 0;
	expect(() => {
		board.placeShip({
			ship: testShip,
			coordinates: { x, y },
			verticalAlignment: false,
		});
	}).toThrow(Error);
});

test('Attack recieved', () => {
	let board = Gameboard();
	const testShip = Ship(5);
	const x = 0;
	const y = 0;
	board.placeShip({
		ship: testShip,
		coordinates: { x, y },
		verticalAlignment: false,
	});
	board.receiveAttack(x + 1, y);
	// Check shot fired
	expect(board.getBoard()[x + 1][y].shotFired).toBe(true);

	// Check attack recieved on ship
	expect(board.getBoard()[x][y].ship.getHits()[1]).toBe(true);
});

test('All ships sunk reported', () => {
	let board = Gameboard();
	const testShip = Ship(5);
	const x = 0;
	const y = 0;
	board.placeShip({
		ship: testShip,
		coordinates: { x, y },
		verticalAlignment: false,
	});
	for (let i = 0, shipLength = testShip.getLength(); i < shipLength; i++) {
		board.receiveAttack(x + i, y);
	}

	expect(board.allSunk()).toBe(true);
});
