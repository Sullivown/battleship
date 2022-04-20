function enemyBoard(boardState) {
	const board = document.createElement('div');
	board.setAttribute('id', 'enemy-board');
	board.classList.add('board');

	for (let i = 0; i < boardState.length; i++) {
		for (let j = 0; j < boardState[i].length; j++) {
			const cell = document.createElement('div');
			cell.dataset.x = i;
			cell.dataset.y = j;
			cell.classList.add('cell');

			if (boardState[i][j].shotFired == true) {
				cell.classList.add('shot-fired');
				cell.textContent = 'X';

				if (boardState[i][j].ship) {
					cell.classList.add('ship-section');
					cell.classList.add('hit');

					if (boardState[i][j].ship.isSunk()) {
						cell.classList.add('sunk');
					}
				}
			} else {
				cell.classList.add('fog-of-war');
			}

			board.appendChild(cell);
		}
	}

	return board;
}

export default enemyBoard;
