import playerBoard from '../boards/playerBoard';
import '../battleScreen/battleScreen.css';

let stateData;

function renderGameOverScreen(state) {
	stateData = state;
	const player1Name = state.player1.getName();
	const player1BoardState = state.player1.board.getBoard();
	const player2Name = state.player2.getName();
	const player2BoardState = state.player2.board.getBoard();

	const msgBox = document.querySelector('#msgbox');
	msgBox.classList.remove('warning-message');
	msgBox.textContent = `${state.winner.getName()} wins!`;

	const battleScreen = document.createElement('div');
	battleScreen.classList.add('flex-column');

	const boardsDiv = document.createElement('div');
	boardsDiv.classList.add('flex-row', 'flex-wrap', 'boards-div');
	battleScreen.appendChild(boardsDiv);

	const boardSection1 = document.createElement('div');
	boardSection1.classList.add('flex-column');
	boardsDiv.appendChild(boardSection1);

	const player1NameTitle = document.createElement('h2');
	player1NameTitle.textContent = player1Name;
	boardSection1.appendChild(player1NameTitle);

	const player1BoardDiv = playerBoard(player1BoardState);
	boardSection1.appendChild(player1BoardDiv);

	const boardSection2 = document.createElement('div');
	boardSection2.classList.add('flex-column');
	boardsDiv.appendChild(boardSection2);

	const player2NameTitle = document.createElement('h2');
	player2NameTitle.textContent = player2Name;
	boardSection2.appendChild(player2NameTitle);

	const player2BoardDiv = playerBoard(player2BoardState);
	boardSection2.appendChild(player2BoardDiv);

	const playAgainButton = document.createElement('button');
	playAgainButton.textContent = 'Play again?';
	playAgainButton.addEventListener('click', playAgain);
	battleScreen.appendChild(playAgainButton);

	const menuReturnButton = document.createElement('button');
	menuReturnButton.textContent = 'Return to Menu';
	menuReturnButton.addEventListener('click', returnToMenu);
	battleScreen.appendChild(menuReturnButton);

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

function returnToMenu() {
	PubSub.publish('RESET');
}

export default renderGameOverScreen;
