import playerBoard from '../boards/playerBoard';
import enemyBoard from '../boards/enemyBoard';
import renderPassScreen from '../passScreen/passScreen';
import './battleScreen.css';

function renderBattleScreen(state) {
	const currentPlayerName = state.currentPlayer.getName();
	const playerBoardState = state.currentPlayer.board.getBoard();
	const enemyBoardState = state.enemyPlayer.board.getBoard();

	const msgBox = document.querySelector('#msgbox');
	msgBox.classList.remove('warning-message');
	msgBox.textContent = `${currentPlayerName}, choose coordinates to attack!`;

	const battleScreen = document.createElement('div');
	battleScreen.classList.add('flex-column');

	if (state.bothHuman) {
		console.log('Both human!');
		battleScreen.appendChild(renderPassScreen(currentPlayerName));
	}

	const boardsDiv = document.createElement('div');
	boardsDiv.classList.add('flex-row', 'flex-wrap', 'boards-div');
	battleScreen.appendChild(boardsDiv);

	const boardSection1 = document.createElement('div');
	boardSection1.classList.add('flex-column');
	boardsDiv.appendChild(boardSection1);

	const currentPlayerTitle = document.createElement('h2');
	currentPlayerTitle.textContent = 'Your Board';
	boardSection1.appendChild(currentPlayerTitle);

	const playerBoardDiv = playerBoard(playerBoardState);
	boardSection1.appendChild(playerBoardDiv);

	const boardSection2 = document.createElement('div');
	boardSection2.classList.add('flex-column');
	boardsDiv.appendChild(boardSection2);

	const enemyPlayerTitle = document.createElement('h2');
	enemyPlayerTitle.textContent = 'Enemy Board';
	boardSection2.appendChild(enemyPlayerTitle);

	const enemyBoardDiv = enemyBoard(enemyBoardState);
	boardSection2.appendChild(enemyBoardDiv);

	return battleScreen;
}

PubSub.subscribe('BATTLE SCREEN RENDERED', () => {
	addEnemyCellListeners();
});

function makeAttack(e) {
	const cell = e.target;
	if (cell.classList.contains('shot-fired')) {
		return;
	} else {
		const shot = {
			coordinates: {
				x: parseInt(cell.dataset.x),
				y: parseInt(cell.dataset.y),
			},
		};
		removeEnemyCellListeners();
		PubSub.publish('SHOT FIRED', shot);
	}
}

function addEnemyCellListeners() {
	const enemyCells = document.querySelectorAll('#enemy-board .cell');
	enemyCells.forEach((cell) => {
		cell.addEventListener('click', makeAttack);
	});
}

function removeEnemyCellListeners() {
	const enemyCells = document.querySelectorAll('#enemy-board .cell');
	enemyCells.forEach((cell) => {
		cell.removeEventListener('click', makeAttack);
	});
}

export default renderBattleScreen;
