function Gameboard(boardSize) {
	let board = initBoard();
	let totalShips = 0;
	let sunkShips = 0;

	// Board initialize function
	// X(i)represents rows, Y(j) represents columns
	function initBoard() {
		let newBoard = [];
		for (let i = 0; i < boardSize; i++) {
			newBoard.push([]);
			for (let j = 0; j < boardSize; j++) {
				newBoard[i].push([]);
				newBoard[i][j] = {
					shotFired: false,
					ship: null,
				};
			}
		}
		return newBoard;
	}

	const getBoard = () => board;

	const validatePlacement = (placement) => {
		let { x, y } = placement.coordinates;
		const shipLength = placement.ship.getLength();

		// Check board positions are valid for ship size
		if (!placement.verticalAlignment) {
			if (x + shipLength > boardSize) {
				return false;
			}
		} else {
			if (y + shipLength > boardSize) {
				return false;
			}
		}

		// Check all spaces are empty
		for (let i = 0; i < shipLength; i++) {
			if (board[x][y] == undefined) {
			}
			if (board[x][y].ship) {
				return false;
			}
			if (placement.verticalAlignment) {
				x += 1;
			} else {
				y += 1;
			}
		}

		return true;
	};

	const placeShip = (placement) => {
		let { x, y } = placement.coordinates;

		if (!validatePlacement(placement)) {
			throw new Error('Ship placement invalid!');
		}

		for (
			let i = 0, shipLength = placement.ship.getLength();
			i < shipLength;
			i++
		) {
			board[x][y].ship = placement.ship;
			board[x][y].shipSection = i;
			if (placement.verticalAlignment) {
				x += 1;
			} else {
				y += 1;
			}
		}

		totalShips += 1;
	};

	const receiveAttack = (coordinates) => {
		const cell = board[coordinates.x][coordinates.y];
		cell.shotFired = true;

		const ship = cell.ship;
		ship.hit(cell.shipSection);

		if (ship.isSunk()) {
			sunkShips += 1;
		}
	};

	const allSunk = () => {
		if (sunkShips >= totalShips) {
			return true;
		} else {
			return false;
		}
	};

	return {
		getBoard,
		validatePlacement,
		placeShip,
		receiveAttack,
		allSunk,
	};
}

export default Gameboard;
