function Gameboard() {
	const BOARD_SIZE = 10;
	let board = initBoard();
	let totalShips = 0;
	let sunkShips = 0;

	// Board initialize function
	function initBoard() {
		let newBoard = [];
		for (let i = 0; i < BOARD_SIZE; i++) {
			newBoard.push([]);
			for (let j = 0; j < BOARD_SIZE; j++) {
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
			if (x + shipLength > BOARD_SIZE) {
				return false;
			}
		} else {
			if (y + shipLength > BOARD_SIZE) {
				return false;
			}
		}

		// Check all spaces are empty
		for (let i = 0; i < shipLength; i++) {
			if (board[x][y].ship) {
				return false;
			}
			if (placement.verticalAlignment) {
				y += 1;
			} else {
				x += 1;
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
				y += 1;
			} else {
				x += 1;
			}
		}

		totalShips += 1;
	};

	const receiveAttack = (x, y) => {
		const cell = board[x][y];
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
