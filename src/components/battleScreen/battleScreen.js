import playerBoard from '../boards/playerBoard';
import enemyBoard from '../boards/enemyBoard';
import './battleScreen.css';

function renderBattleScreen(state) {
	const currentPlayerName = state.currentPlayer.getName();
	const playerBoardState = state.currentPlayer.board.getBoard();
	const enemyPlayerName = state.enemyPlayer.getName();
	const enemyBoardState = state.enemyPlayer.board.getBoard();

	const msgBox = document.querySelector('#msgbox');
	msgBox.classList.remove('warning-message');
	msgBox.textContent = `${currentPlayerName}, choose coordinate to attack!`;

	const battleScreen = document.createElement('div');
	battleScreen.classList.add('flex-column');

	const boardsDiv = document.createElement('div');
	boardsDiv.classList.add('flex-row', 'wrap', 'boards-div');
	battleScreen.appendChild(boardsDiv);

	const playerBoardDiv = playerBoard(playerBoardState);
	boardsDiv.appendChild(playerBoardDiv);

	const enemyBoardDiv = enemyBoard(enemyBoardState);
	boardsDiv.appendChild(enemyBoardDiv);

	return battleScreen;
}

PubSub.subscribe('BATTLE SCREEN RENDERED', () => {
	addEnemyCellListeners();
});

function addEnemyCellListeners() {
	const enemyCells = document.querySelectorAll('#enemy-board .cell');
	enemyCells.forEach((cell) => {
		cell.addEventListener('click', (e) => {
			if (cell.classList.contains('shot-fired')) {
				return;
			} else {
				const shot = {
					coordinates: {
						x: parseInt(cell.dataset.x),
						y: parseInt(cell.dataset.y),
					},
				};
				console.log(
					'CELL LISTENER: ' +
						shot.coordinates.x +
						' ' +
						shot.coordinates.y
				);
				PubSub.publish('SHOT FIRED', shot);
			}
		});
	});
}

export default renderBattleScreen;
