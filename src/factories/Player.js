import validateShipPlacement from '../helpers/validateShipPlacement';

function Player(name, type) {
	const getName = () => name;
	const getType = () => type;
	let movesMade = [];
	let successfulHits = [];
	let board;
	let shipyard;

	const validAttack = (coordinates) => {
		const found = movesMade.find(
			(element) =>
				element.x == coordinates.x && element.y == coordinates.y
		);
		if (found) {
			return false;
		} else {
			return true;
		}
	};
	const attack = (enemyPlayer, coordinates) => {
		if (validAttack(coordinates)) {
			enemyPlayer.board.receiveAttack(coordinates);
			movesMade.push(coordinates);

			// If attack hits a ship add it to the success array
			if (
				enemyPlayer.board.getBoard()[coordinates.x][coordinates.y]
					.ship != null
			) {
				successfulHits.push(coordinates);
			}
		} else {
			throw new Error('Invalid attack!');
		}
	};

	const getAIMove = (boardSize, enemyBoard) => {
		let coordinates = null;
		let validMove = false;

		// Try and get a move near a successful hit, if any are available;
		for (let hit of successfulHits) {
			if (!enemyBoard[hit.x][hit.y].ship.isSunk())
				for (let i = -1; i < 2; i++) {
					for (let j = -1; j < 2; j++) {
						const x = parseInt(hit.x) + i;
						const y = parseInt(hit.y) + j;

						// Only explore orthogonal coordinates (no diagonals)
						if (i - j == 1 || i - j == -1) {
							const tempCoordinates = { x, y };
							if (validAttack(tempCoordinates)) {
								coordinates = tempCoordinates;
							}
						}
					}
				}
		}

		// Otherwise return a random valid move
		if (!coordinates) {
			do {
				const x = Math.floor(Math.random() * boardSize);
				const y = Math.floor(Math.random() * boardSize);
				coordinates = { x, y };

				if (validAttack(coordinates)) {
					validMove = true;
				}
			} while (!validMove);
		}

		return coordinates;
	};

	const placeAIShips = (shipyard, board) => {
		const boardSize = board.getBoard().length;

		for (const ship of shipyard) {
			let placement = {
				ship: ship,
				coordinates: {
					x: 0,
					y: 0,
				},
				verticalAlignment: randomVerticalAlignment(),
			};
			let validMove = false;

			do {
				const x = Math.floor(Math.random() * boardSize);
				const y = Math.floor(Math.random() * boardSize);
				placement.coordinates = { x, y };
				// Placement obj contains coordinates (x, y) obj, ship and vertical alignment
				if (validateShipPlacement(placement, board.getBoard())) {
					validMove = true;
				}
			} while (!validMove);

			board.placeShip(placement);

			const shipyardIndex = shipyard.findIndex((element) => {
				if (element != null) {
					return element == ship;
				}
			});
			shipyard[shipyardIndex] = null;
		}
	};

	return {
		getName,
		getType,
		attack,
		getAIMove,
		placeAIShips,
		board,
		shipyard,
	};
}

function randomVerticalAlignment() {
	return Math.random() < 0.5;
}

export default Player;
