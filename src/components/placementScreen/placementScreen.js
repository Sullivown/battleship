import board from '../board/board';
import shipyard from './shipyard';
import './placementScreen.css';

let selectedShip = null;

function placementScreen(player) {
	const playerName = player.getName();
	const playerBoardState = player.board.getBoard();
	const playerShipyard = player.shipyard;

	const msgBox = document.querySelector('#msgbox');
	msgBox.classList.remove('warning-message');
	msgBox.textContent = `${playerName}, place your fleet!`;

	const placementScreen = document.createElement('div');
	placementScreen.classList.add('flex-column');

	const boardsDiv = document.createElement('div');
	boardsDiv.classList.add('flex-row', 'wrap', 'boards-div');
	placementScreen.appendChild(boardsDiv);

	const playerBoard = board(playerBoardState);
	boardsDiv.appendChild(playerBoard);

	boardsDiv.appendChild(shipyard(playerShipyard));

	const startButton = document.createElement('button');
	startButton.type = 'button';
	startButton.textContent = 'To Battle!';

	startButton.addEventListener('click', (e) => {});

	placementScreen.appendChild(startButton);

	return placementScreen;
}

PubSub.subscribe('PLACEMENT BOARD RENDERED', () => {
	const cells = document.querySelectorAll('.cell');
	cells.forEach((cell) => {
		cell.addEventListener('click', () => {
			if (selectedShip) {
				const placement = {
					shipId: selectedShip,
					coordinates: {
						x: parseInt(cell.dataset.x),
						y: parseInt(cell.dataset.y),
					},
					verticalAlignment: false,
				};
				placeShip(placement);
			}
		});
	});
});

PubSub.subscribe('SHIP SELECTED PLACEMENT', (msg, data) => {
	selectedShip = data.selectedShip;
});

PubSub.subscribe('INVALID SHIP PLACEMENT', (msg, data) => {
	const msgBox = document.querySelector('#msgbox');
	msgBox.textContent = 'Invalid Ship Placement!';
	msgBox.classList.add('warning-message');
});

function placeShip(placement) {
	PubSub.publish('PLACE SHIP', placement);
}

function handleStartBattleClick() {
	PubSub.publish('BATTLE STARTED');
}

export default placementScreen;
