import Gameboard from './Gameboard';
import Ship from './Ship';

describe('Gameboard initializer', () => {
	let board;
	beforeEach(() => {
		board = Gameboard(10);
	});

	test('Gameboard Creation', () => {
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
		const testShip = Ship(0, 3);
		const x = 1;
		const y = 3;

		board.placeShip({
			ship: testShip,
			coordinates: { x, y },
			verticalAlignment: true,
		});
		for (
			let i = 0, shipLength = testShip.getLength();
			i < shipLength;
			i++
		) {
			expect(board.getBoard()[x + i][y]).toEqual({
				shotFired: false,
				ship: testShip,
				shipSection: i,
			});
		}
	});

	test('Ship placement horizontal', () => {
		const testShip = Ship(0, 5);
		const x = 3;
		const y = 0;
		board.placeShip({
			ship: testShip,
			coordinates: { x, y },
			verticalAlignment: false,
		});
		for (
			let i = 0, shipLength = testShip.getLength();
			i < shipLength;
			i++
		) {
			expect(board.getBoard()[x][y + i]).toEqual({
				shotFired: false,
				ship: testShip,
				shipSection: i,
			});
		}
	});

	test('Ship placement invalid - outside board', () => {
		const testShip = Ship(0, 15);
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

	test('Ship placement invalid - existing ship', () => {
		const testShip1 = Ship(0, 2);
		const testShip2 = Ship(1, 2);
		const x = 0;
		const y = 0;
		expect(() => {
			board.placeShip({
				ship: testShip1,
				coordinates: { x, y },
				verticalAlignment: false,
			});
			board.placeShip({
				ship: testShip2,
				coordinates: { x, y },
				verticalAlignment: false,
			});
		}).toThrow(Error);
	});

	test('Attack recieved', () => {
		const testShip = Ship(0, 5);
		const x = 0;
		const y = 0;
		board.placeShip({
			ship: testShip,
			coordinates: { x, y },
			verticalAlignment: false,
		});
		board.receiveAttack({ x, y: y + 1 });
		// Check shot fired
		expect(board.getBoard()[x][y + 1].shotFired).toBe(true);

		// Check attack recieved on ship
		expect(board.getBoard()[x][y].ship.getHits()[1]).toBe(true);
	});

	test('Missed hit', () => {
		board.receiveAttack({ x: 0, y: 0 });
		expect(board.getBoard()[0][0].shotFired).toBe(true);
	});

	test('All ships sunk reported', () => {
		const testShip = Ship(0, 5);
		const x = 0;
		const y = 0;
		board.placeShip({
			ship: testShip,
			coordinates: { x, y },
			verticalAlignment: false,
		});
		for (
			let i = 0, shipLength = testShip.getLength();
			i < shipLength;
			i++
		) {
			board.receiveAttack({ x, y: y + i });
		}

		expect(board.allSunk()).toBe(true);
	});

	test('Remove ship from board', () => {
		const ship1 = Ship(0, 3);
		const x = 0;
		const y = 0;
		const coordinates = { x, y };
		board.placeShip({
			ship: ship1,
			coordinates: { x, y },
			verticalAlignment: false,
		});

		board.removeShip(ship1);
		expect(board.getBoard()[0][0].ship).toBe(null);
		expect(board.getBoard()[0][1].ship).toBe(null);
		expect(board.getBoard()[0][3].ship).toBe(null);
	});
});
