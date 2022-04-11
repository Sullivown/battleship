import Gameboard from '../factories/Gameboard';
import Player from '../factories/Player';
import Ship from '../factories/Ship';

const gameController = (() => {
	let player1;
	let player2;
	let currentPlayer;

	const getGame = () => {
		return { player1, player2 };
	};

	const createNewGame = (params) => {
		player1 = Player(params.player1.name, params.player1.type);
		player2 = Player(params.player2.name, params.player2.type);

		player1.board = Gameboard();
		player2.board = Gameboard();

		currentPlayer = player1;
	};

	const gameOverCheck = () => {
		// checks player boards for allSunk and returns the winning player if there is one or false if not
		const p1Sunk = player1.board.allSunk();
		const p2Sunk = player2.board.allSunk();

		if (p1Sunk) {
			return player2;
		} else if (p2Sunk) {
			return player1;
		} else {
			return false;
		}
	};

	return { createNewGame, getGame, gameOverCheck };
})();

export default gameController;