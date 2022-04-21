import playerBoard from '../boards/playerBoard';
import enemyBoard from '../boards/enemyBoard';
import '../battleScreen/battleScreen.css';

let stateData;

function renderGameOverScreen(state) {
	stateData = state;
	const currentPlayerName = state.currentPlayer.getName();
	const playerBoardState = state.currentPlayer.board.getBoard();
	const enemyPlayerName = state.enemyPlayer.getName();
	const enemyBoardState = state.enemyPlayer.board.getBoard();

	const msgBox = document.querySelector('#msgbox');
	msgBox.classList.remove('warning-message');
	msgBox.textContent = `${state.winner.getName()} wins!`;

	const battleScreen = document.createElement('div');
	battleScreen.classList.add('flex-column');

	const boardsDiv = document.createElement('div');
	boardsDiv.classList.add('flex-row', 'flex-wrap', 'boards-div');
	battleScreen.appendChild(boardsDiv);

	const playerBoardDiv = playerBoard(playerBoardState);
	boardsDiv.appendChild(playerBoardDiv);

	const enemyBoardDiv = playerBoard(enemyBoardState);
	boardsDiv.appendChild(enemyBoardDiv);

	const playAgainButton = document.createElement('button');
	playAgainButton.textContent = 'Play again?';
	playAgainButton.addEventListener('click', playAgain);
	battleScreen.appendChild(playAgainButton);

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

function playAgain(e) {
	e.target.removeEventListener('click', playAgain);
	const data = {
		player1: {
			name: stateData.player1.getName(),
			type: stateData.player1.getType(),
		},
		player2: {
			name: stateData.player2.getName(),
			type: stateData.player2.getType(),
		},
	};
	PubSub.publish('CREATE NEW GAME', data);
}

export default renderGameOverScreen;
