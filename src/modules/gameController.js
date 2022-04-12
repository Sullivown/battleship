import PubSub from 'pubsub-js';
import Gameboard from '../factories/Gameboard';
import Player from '../factories/Player';
import Ship from '../factories/Ship';

const gameController = (() => {
	const BOARD_SIZE = 10;
	let player1;
	let player2;
	let currentPlayer;
	let gameStage = 'select';

	const getGameState = () => {
		return { player1, player2, currentPlayer, gameStage };
	};

	const createNewGame = (params) => {
		player1 = Player(params.player1.name, params.player1.type);
		player2 = Player(params.player2.name, params.player2.type);

		player1.board = Gameboard(BOARD_SIZE);
		player2.board = Gameboard(BOARD_SIZE);

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

	const switchPlayer = () => {
		currentPlayer == player1
			? (currentPlayer = player2)
			: (currentPlayer = player1);
	};

	const setGameStage = (stage) => {
		gameStage = stage;
	};

	// PubSub
	PubSub.subscribe('CREATE NEW GAME', (msg, data) => {
		createNewGame(data);
		setGameStage('placement');
		PubSub.publish('GAME STATE CHANGED', getGameState());
	});

	return { createNewGame, getGameState, gameOverCheck };
})();

export default gameController;
