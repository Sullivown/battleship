import PubSub from 'pubsub-js';
import Gameboard from '../factories/Gameboard';
import Player from '../factories/Player';
import Ship from '../factories/Ship';
import shipIdGenerator from '../helpers/shipIdGenerator';
import getShipFromDisplayId from '../helpers/getShipFromDisplayId';
import emptyShipyardCheck from '../helpers/emptyShipyardCheck';

const gameController = (() => {
	const BOARD_SIZE = 10;
	const SHIPS = [2, 3, 3, 4, 5];
	let player1;
	let player2;
	let currentPlayer;
	let enemyPlayer;
	let gameStage = 'select';
	let winner;

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
		enemyPlayer = player2;
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
			? ((currentPlayer = player2), (enemyPlayer = player1))
			: ((currentPlayer = player1), (enemyPlayer = player2));
	};

	const handleAIPlayer = () => {
		if (currentPlayer.getType() != 'ai') {
			return;
		}
		// Placement
		if (gameStage == 'placement') {
			if (!emptyShipyardCheck(currentPlayer.shipyard)) {
				// Make AI placements
				currentPlayer.placeAIShips(
					currentPlayer.shipyard,
					currentPlayer.board
				);
				PubSub.publish('PLACEMENT COMPLETE');
			}
		}

		// Battle
		if (gameStage == 'battle') {
			const shot = {};
			shot.coordinates = currentPlayer.getAIMove(BOARD_SIZE);
			console.log('the AI attacked!');
			PubSub.publish('SHOT FIRED', shot);
		}

		// Game Over

		return;
	};

	const setGameStage = (stage) => {
		gameStage = stage;
	};

	// PubSub
	PubSub.subscribe('CREATE NEW GAME', (msg, data) => {
		createNewGame(data);
		setGameStage('placement');
		if (currentPlayer.getType() == 'ai') {
			currentPlayer.placeAIShips(
				currentPlayer.shipyard,
				currentPlayer.board
			);
			switchPlayer();
		}
		if (currentPlayer.getType() == 'ai') {
			currentPlayer.placeAIShips(
				currentPlayer.shipyard,
				currentPlayer.board
			);
			switchPlayer();
			setGameStage('battle');
		}
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
		// Remove ship from player shipyard and set alignment
		ship.verticalAlignment = data.verticalAlignment;
		currentPlayer.shipyard[shipyardIndex] = null;

		PubSub.publish('GAME STATE CHANGED', getGameState());
	});

	PubSub.subscribe('PLACEMENT COMPLETE', (msg, data) => {
		switchPlayer();
		handleAIPlayer();

		if (
			emptyShipyardCheck(player1.shipyard) &&
			emptyShipyardCheck(player2.shipyard)
		) {
			setGameStage('battle');
			// If AI, make first move
			if (currentPlayer.getType() == 'ai') {
				handleAIPlayer();
			}
		}

		PubSub.publish('GAME STATE CHANGED', getGameState());
	});

	PubSub.subscribe('SHOT FIRED', (msg, data) => {
		const { x, y } = data.coordinates;
		currentPlayer.attack(enemyPlayer, data.coordinates);

		// Switch player if the attack misses
		if (enemyPlayer.board.getBoard()[x][y].ship == null) {
			switchPlayer();
			console.log(currentPlayer.getName());
		}

		handleAIPlayer();

		// Check for game over
		const winnerCheck = gameOverCheck();
		if (winnerCheck) {
			setGameStage('finished');
			winner = winnerCheck;
		}

		PubSub.publish('GAME STATE CHANGED', getGameState());
	});

	return { createShipyard, createNewGame, getGameState, gameOverCheck };
})();

export default gameController;
