function board(boardState) {
	const board = document.createElement('div');
	board.classList.add('board');
	for (let i = 0; i < boardState.length; i++) {
		for (let j = 0; j < boardState[i].length; j++) {
			const cell = document.createElement('div');
			cell.dataset.x = j;
			cell.dataset.y = i;
			cell.classList.add('cell');
			if (boardState[i][j].ship == true) {
				cell.classList.add('ship');
			}

			if (boardState[i][j].shotFired == true) {
				cell.classList.add('shot-fired');
				cell.textContent = 'X';
			}

			board.appendChild(cell);
		}
	}

	return board;
}

export default board;
