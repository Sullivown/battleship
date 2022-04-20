import playerBoard from '../boards/playerBoard';
import enemyBoard from '../boards/enemyBoard';
import '../battleScreen/battleScreen.css';

function renderGameOverScreen(state) {
	const currentPlayerName = state.currentPlayer.getName();
	const playerBoardState = state.currentPlayer.board.getBoard();
	const enemyPlayerName = state.enemyPlayer.getName();
	const enemyBoardState = state.enemyPlayer.board.getBoard();

	const msgBox = document.querySelector('#msgbox');
	msgBox.classList.remove('warning-message');
	msgBox.textContent = `The winner is ${state.winner.getName()}!`;

	const battleScreen = document.createElement('div');
	battleScreen.classList.add('flex-column');

	const boardsDiv = document.createElement('div');
	boardsDiv.classList.add('flex-row', 'wrap', 'boards-div');
	battleScreen.appendChild(boardsDiv);

	const playerBoardDiv = playerBoard(playerBoardState);
	boardsDiv.appendChild(playerBoardDiv);

	const enemyBoardDiv = playerBoard(enemyBoardState);
	boardsDiv.appendChild(enemyBoardDiv);

	return battleScreen;
}

PubSub.subscribe('GAME OVER SCREEN RENDERED', () => {
	// Remove all existing event listeners
	const oldBoards = document.querySelectorAll('.board');
	oldBoards.forEach((board) => {
		const newBoard = board.cloneNode(true);
		board.parentNode.replaceChild(newBoard, board);
	});
});

function removeEnemyCellListeners() {
	const enemyCells = document.querySelectorAll('#enemy-board .cell');
	enemyCells.forEach((cell) => {
		cell.removeEventListener('click', makeAttack);
	});
}

export default renderGameOverScreen;
