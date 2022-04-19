const validateShipPlacement = (placement, board) => {
	// Placement obj contains coordinates (x, y) obj, ship and vertical alignment
	let { x, y } = placement.coordinates;
	const boardSize = board.length;
	const shipLength = placement.ship.getLength();

	// Check board positions are valid for ship size
	if (placement.verticalAlignment) {
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
			return false;
		}
		if (placement.location == 'board' && i == 0) {
			if (placement.verticalAlignment) {
				x += 1;
			} else {
				y += 1;
			}
			continue;
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

export default validateShipPlacement;
