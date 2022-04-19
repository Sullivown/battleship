function playerBoard(boardState) {
	const board = document.createElement('div');
	board.setAttribute('id', 'player-board');
	board.classList.add('board');

	for (let i = 0; i < boardState.length; i++) {
		for (let j = 0; j < boardState[i].length; j++) {
			const cell = document.createElement('div');
			cell.dataset.x = i;
			cell.dataset.y = j;
			cell.classList.add('cell');

			if (boardState[i][j].ship) {
				cell.dataset.shipid = boardState[i][j].ship.getId();
				cell.dataset.verticalAlignment =
					boardState[i][j].ship.verticalAlignment;
				cell.classList.add('ship-section');
				if (boardState[i][j].shipSection == 0) {
					cell.classList.add('ship-forward');
				}
				if (
					boardState[i][j].shipSection ==
					boardState[i][j].ship.getLength() - 1
				) {
					cell.classList.add('ship-aft');
				}
			}

			if (boardState[i][j].shotFired == true) {
				cell.classList.add('shot-fired');
				cell.textContent = 'X';
				if (boardState[i][j].ship) {
					cell.classList.add('hit');
				}
			}

			board.appendChild(cell);
		}
	}

	return board;
}

export default playerBoard;
