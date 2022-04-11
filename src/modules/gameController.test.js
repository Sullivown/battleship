import gameController from './gameController';
import Gameboard from '../factories/Gameboard';
import Player from '../factories/Player';
import Ship from '../factories/Ship';

test('Create new game', () => {
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

	player1Obj.board = Gameboard();
	player2Obj.board = Gameboard();

	expect(JSON.stringify(gameController.getGame())).toEqual(
		JSON.stringify({
			player1: player1Obj,
			player2: player2Obj,
		})
	);
});

test.todo('Check players switch successfully');
