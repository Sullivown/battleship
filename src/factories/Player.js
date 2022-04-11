function Player(name, type) {
	const getName = () => name;
	const getType = () => type;
	let movesMade = [];
	let board;

	const validAttack = (coordinates) => {
		const found = movesMade.find((element) => element == coordinates);
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
		} else {
			throw new Error('Invalid attack!');
		}
	};

	const getAIMove = (boardSize) => {
		let coordinates = null;

		let validMove = false;

		do {
			const x = Math.floor(Math.random() * boardSize);
			const y = Math.floor(Math.random() * boardSize);
			coordinates = { x, y };

			if (validAttack(coordinates)) {
				validMove = true;
			}
		} while (!validMove);

		return coordinates;
	};

	return {
		getName,
		getType,
		attack,
		getAIMove,
		board,
	};
}

export default Player;
