import board from '../board/board';
import shipyard from './shipyard';
import './placementScreen.css';

function placementScreen(player) {
	const playerName = player.getName();
	const playerBoardState = player.board.getBoard();
	const playerShipyard = player.shipyard;

	const placementScreen = document.createElement('div');
	placementScreen.classList.add('flex-column');

	const msgBox = document.createElement('div');
	msgBox.setAttribute('id', 'msgbox');
	msgBox.textContent = `${playerName}, place your fleet!`;
	placementScreen.appendChild(msgBox);

	const boardsDiv = document.createElement('div');
	boardsDiv.classList.add('flex-row', 'wrap');
	placementScreen.appendChild(boardsDiv);

	const playerBoard = board(playerBoardState);
	boardsDiv.appendChild(playerBoard);

	boardsDiv.appendChild(shipyard(playerShipyard));

	const startButton = document.createElement('button');
	startButton.type = 'button';
	startButton.textContent = 'To Battle!';

	startButton.addEventListener('click', () => {
		const placement = {
			shipId: 0,
			coordinates: { x: 0, y: 0 },
			verticalAlignment: false,
		};
		placeShip(placement);
	});

	placementScreen.appendChild(startButton);

	// FOR NOW place ships at pre determined places

	return placementScreen;
}

function placeShip(placement) {
	PubSub.publish('PLACE SHIP', placement);
}

function handleStartBattleClick() {
	PubSub.publish('BATTLE STARTED');
}

export default placementScreen;
