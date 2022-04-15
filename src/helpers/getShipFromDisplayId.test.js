import getShipFromDisplayId from './getShipFromDisplayId';
import Gameboard from '../factories/Gameboard';
import Player from '../factories/Player';
import Ship from '../factories/Ship';

test('Get ship - shipyard', () => {
	const board = Gameboard(10);
	const player1 = Player('Bob', 'human');
	const ship1 = Ship(0, 2);
	const displayId = 0;

	player1.shipyard = [ship1];

	const { ship, location, shipyardIndex } = getShipFromDisplayId(
		displayId,
		board,
		player1.shipyard
	);

	expect(location).toBe('shipyard');
	expect(ship).toBe(ship1);
	expect(shipyardIndex).toBe(0);
});

test('Get ship - board', () => {
	const player1 = Player('Bob', 'human');
	const ship1 = Ship(0, 2);
	const displayId = 0;
	const x = 0;
	const y = 0;

	player1.shipyard = [null];
	player1.board = Gameboard(10);

	player1.board.placeShip({
		ship: ship1,
		coordinates: { x, y },
		verticalAlignment: true,
	});

	const { ship, location, shipyardIndex } = getShipFromDisplayId(
		displayId,
		player1.board.getBoard(),
		player1.shipyard
	);

	expect(location).toBe('board');
	expect(player1.board.getBoard()[x][y].ship).toBe(ship1);
	expect(ship).toBe(ship1);
	expect(shipyardIndex).toBe(undefined);
});
