import board from '../board/board';
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

	const playerBoard = board(playerBoardState);
	boardsDiv.appendChild(playerBoard);

	const enemyBoard = board(enemyBoardState);
	boardsDiv.appendChild(enemyBoard);

	return battleScreen;
}

export default renderBattleScreen;
