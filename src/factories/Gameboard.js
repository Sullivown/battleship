import validateShipPlacement from '../helpers/validateShipPlacement';

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

	const placeShip = (placement) => {
		let { x, y } = placement.coordinates;

		if (!validateShipPlacement(placement, board)) {
			PubSub.publish('INVALID SHIP PLACEMENT');
			throw new Error('Ship placement invalid!');
		}

		removeShip(placement.ship);
		placement.ship.verticalAlignment = placement.verticalAlignment;

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

	const removeShip = (ship) => {
		for (let i = 0, boardSize = board.length; i < boardSize; i++) {
			for (let j = 0, boardSize = board.length; j < boardSize; j++) {
				if (board[i][j].ship == ship) {
					board[i][j].ship = null;
				}
			}
		}
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
		placeShip,
		removeShip,
		receiveAttack,
		allSunk,
	};
}

export default Gameboard;
