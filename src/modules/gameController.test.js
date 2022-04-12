import gameController from './gameController';
import Gameboard from '../factories/Gameboard';
import Player from '../factories/Player';
import Ship from '../factories/Ship';

test('Create new game', () => {
	const SHIPS = [2, 3, 3, 4, 5];
	const params = {
		player1: {
			name: 'Morgan',
			type: 'human',
		},
		player2: {
			name: 'Lazarus',
			type: 'computer',
		},
	};
	gameController.createNewGame(params);
	const player1Obj = Player('Morgan', 'human');
	const player2Obj = Player('Lazarus', 'computer');

	player1Obj.shipyard = gameController.createShipyard(SHIPS);
	player2Obj.shipyard = gameController.createShipyard(SHIPS);

	player1Obj.board = Gameboard();
	player2Obj.board = Gameboard();

	expect(JSON.stringify(gameController.getGameState())).toEqual(
		JSON.stringify({
			player1: player1Obj,
			player2: player2Obj,
			currentPlayer: player1Obj,
			gameStage: 'select',
		})
	);
});

test.todo('Check players switch successfully');
