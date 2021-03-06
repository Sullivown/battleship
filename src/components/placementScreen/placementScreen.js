import playerBoard from '../boards/playerBoard';
import shipyard from './shipyard';
import renderPassScreen from '../passScreen/passScreen';
import emptyShipyardCheck from '../../helpers/emptyShipyardCheck';
import './placementScreen.css';

let selectedShip = { shipId: null, verticalAlignment: false, onBoard: false };

function renderPlacementScreen(data) {
	selectedShip = resetSelectedShip();
	const playerName = data.currentPlayer.getName();
	const playerBoardState = data.currentPlayer.board.getBoard();
	const playerShipyard = data.currentPlayer.shipyard;

	const msgBox = document.querySelector('#msgbox');
	msgBox.classList.remove('warning-message');
	msgBox.innerHTML = `${String(
		playerName
	)}, place your fleet!<br>Click to select a ship, then click on a valid square on the board to place the ship<br>Use SPACEBAR or click the button to switch alignment.`;

	const placementScreen = document.createElement('div');
	placementScreen.classList.add('flex-column');

	if (data.bothHuman && !playerShipyard.includes(null)) {
		placementScreen.appendChild(renderPassScreen(playerName));
	}

	const boardsDiv = document.createElement('div');
	boardsDiv.classList.add('flex-row', 'flex-wrap', 'boards-div');
	placementScreen.appendChild(boardsDiv);

	const playerBoardDiv = playerBoard(playerBoardState);
	boardsDiv.appendChild(playerBoardDiv);

	boardsDiv.appendChild(shipyard(playerShipyard));

	if (emptyShipyardCheck(playerShipyard)) {
		const startButton = document.createElement('button');
		startButton.type = 'button';
		startButton.textContent = 'To Battle!';
		startButton.addEventListener('click', placementCompleteClicked);
		placementScreen.appendChild(startButton);
	}

	document.removeEventListener('keyup', switchAlignment);
	document.addEventListener('keyup', switchAlignment);

	return placementScreen;
}

// PubSub

PubSub.subscribe('PLACEMENT SCREEN RENDERED', () => {
	removeEventListeners();
	addCellListeners();
	addShipListeners();
	addAlignmentListener();
});

PubSub.subscribe('INVALID SHIP PLACEMENT', (msg, data) => {
	const msgBox = document.querySelector('#msgbox');
	msgBox.textContent = 'Invalid Ship Placement!';
	msgBox.classList.add('warning-message');
});

function resetSelectedShip() {
	return { shipId: null, verticalAlignment: false, onBoard: false };
}

function addCellListeners() {
	const cells = document.querySelectorAll('.cell');
	cells.forEach((cell) => {
		cell.addEventListener('click', handlePlaceShip);
	});
}

function handlePlaceShip(event) {
	const cell = event.target;
	if (cell.classList.contains('ship-section')) {
		return;
	} else if (selectedShip.shipId) {
		const placement = {
			shipId: parseInt(selectedShip.shipId),
			coordinates: {
				x: parseInt(cell.dataset.x),
				y: parseInt(cell.dataset.y),
			},
			verticalAlignment: selectedShip.verticalAlignment,
		};
		placeShip(placement);
	}
}

function addShipListeners() {
	const ships = document.querySelectorAll('.ship-section');
	ships.forEach((ship) => {
		ship.addEventListener('click', selectShip);
	});
}

function addAlignmentListener() {
	const btn = document.querySelector('#alignment');
	btn.removeEventListener('click', switchAlignment);
	btn.addEventListener('click', switchAlignment);
}

function selectShip(e) {
	const currSelected = document.querySelectorAll('.ship-selected');
	if (currSelected) {
		currSelected.forEach((section) => {
			section.classList.remove('ship-selected');
		});
	}
	selectedShip.shipId = e.target.dataset.shipid;
	document
		.querySelectorAll(`.ship-section[data-shipid='${selectedShip.shipId}']`)
		.forEach((section) => {
			section.classList.add('ship-selected');
		});
	if (e.target.parentNode.classList.contains('board')) {
		selectedShip.onBoard = true;
	} else {
		selectedShip.onBoard = false;
	}

	// Convert to boolean
	if (e.target.dataset.verticalAlignment == 'true') {
		selectedShip.verticalAlignment = true;
	} else {
		selectedShip.verticalAlignment = false;
	}
}

function switchAlignment(event) {
	let ship;
	// Determine if ship is on the board or in shipyard
	if (
		selectedShip.shipId != null &&
		(event.code == 'Space' || event.target.id == 'alignment')
	) {
		if (selectedShip.onBoard) {
			ship = document.querySelector(
				`.ship-section[data-shipid='${selectedShip.shipId}']`
			);
			selectedShip.verticalAlignment = !selectedShip.verticalAlignment;

			const placement = {
				shipId: parseInt(selectedShip.shipId),
				coordinates: {
					x: parseInt(ship.dataset.x),
					y: parseInt(ship.dataset.y),
				},
				verticalAlignment: selectedShip.verticalAlignment,
			};
			placeShip(placement);
			selectedShip.ship = resetSelectedShip();
		} else {
			ship = document.querySelector(
				`.ship-outline[data-shipid='${selectedShip.shipId}']`
			);
			if (ship.dataset.verticalAlignment == 'true') {
				selectedShip.verticalAlignment = false;
			} else {
				selectedShip.verticalAlignment = true;
			}

			const shipSections = document.querySelectorAll('.ship-selected');
			shipSections.forEach((section) => {
				if (selectedShip.verticalAlignment) {
					section.classList.add('ship-vertical');
					section.dataset.verticalAlignment = true;
				} else {
					section.classList.remove('ship-vertical');
					section.dataset.verticalAlignment = false;
				}
			});

			if (selectedShip.verticalAlignment) {
				ship.classList.add('ship-vertical');
				ship.dataset.verticalAlignment = true;
			} else {
				ship.classList.remove('ship-vertical');
				ship.dataset.verticalAlignment = false;
			}
		}
	}
}

function removeEventListeners() {
	const cells = document.querySelectorAll('.cell');
	cells.forEach((cell) => {
		cell.removeEventListener('click', handlePlaceShip);
	});

	const ships = document.querySelectorAll('.ship-section');
	ships.forEach((ship) => {
		ship.removeEventListener('click', selectShip);
	});
}

function placeShip(placement) {
	PubSub.publish('PLACE SHIP', placement);
	selectedShip.ship = resetSelectedShip();
}

function placementCompleteClicked() {
	PubSub.publish('PLACEMENT COMPLETE');
}

export default renderPlacementScreen;
