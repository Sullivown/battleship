import PubSub from 'pubsub-js';
import Gameboard from '../factories/Gameboard';
import Player from '../factories/Player';
import Ship from '../factories/Ship';
import shipIdGenerator from '../helpers/shipIdGenerator';
import getShipFromDisplayId from '../helpers/getShipFromDisplayId';

const gameController = (() => {
	const BOARD_SIZE = 10;
	const SHIPS = [2, 3, 3, 4, 5];
	let player1;
	let player2;
	let currentPlayer;
	let gameStage = 'select';

	const getGameState = () => {
		return { player1, player2, currentPlayer, gameStage };
	};

	const createShipyard = (ships) => {
		let shipyard = [];
		for (let ship of ships) {
			const id = shipIdGenerator();
			shipyard.push(Ship(id, ship));
		}
		return shipyard;
	};

	const createNewGame = (params) => {
		player1 = Player(params.player1.name, params.player1.type);
		player2 = Player(params.player2.name, params.player2.type);

		player1.board = Gameboard(BOARD_SIZE);
		player2.board = Gameboard(BOARD_SIZE);

		player1.shipyard = createShipyard(SHIPS);
		player2.shipyard = createShipyard(SHIPS);

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

	PubSub.subscribe('PLACE SHIP', (msg, data) => {
		// find ship in shipyard OR on board
		const { ship, location, shipyardIndex } = getShipFromDisplayId(
			data.shipId,
			currentPlayer.board.getBoard(),
			currentPlayer.shipyard
		);

		// Place ship on board
		currentPlayer.board.placeShip({
			ship: ship,
			coordinates: data.coordinates,
			verticalAlignment: data.verticalAlignment,
			location: location,
		});
		// Remove ship from player shipyard and set alignement
		ship.verticalAlignment = data.verticalAlignment;
		currentPlayer.shipyard[shipyardIndex] = null;

		PubSub.publish('GAME STATE CHANGED', getGameState());
	});

	PubSub.subscribe('START BATTLE', (msg, data) => {
		if (currentPlayer == player1) {
			currentPlayer = player2;
		} else if (currentPlayer == player2) {
			gameStage = 'battle';
		}
		PubSub.publish('GAME STATE CHANGED', getGameState());
	});

	return { createShipyard, createNewGame, getGameState, gameOverCheck };
})();

export default gameController;
