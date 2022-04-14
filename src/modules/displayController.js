import selectScreen from '../components/selectScreen/selectScreen';
import placementScreen from '../components/placementScreen/placementScreen';

const displayController = (() => {
	// DOM cache
	const body = document.querySelector('body');
	let app;
	let msgBox;
	let gameArea;

	const init = () => {
		const header = document.createElement('header');
		header.setAttribute('id', 'header');
		body.appendChild(header);
		const title = document.createElement('h1');
		title.textContent = 'BattleShip';
		header.appendChild(title);

		const appDiv = document.createElement('div');
		appDiv.setAttribute('id', 'app');
		appDiv.classList.add('flex-column');
		body.appendChild(appDiv);

		const msgBoxDiv = document.createElement('div');
		msgBoxDiv.setAttribute('id', 'msgbox');
		msgBoxDiv.classList.add('flex-row');
		appDiv.appendChild(msgBoxDiv);

		const gameAreaDiv = document.createElement('div');
		gameAreaDiv.setAttribute('id', 'game-area');
		gameAreaDiv.classList.add('flex-row');
		appDiv.appendChild(gameAreaDiv);

		cacheDOM();

		renderSelectScreen();
	};

	const cacheDOM = () => {
		app = document.querySelector('#app');
		msgBox = document.querySelector('#msgbox');
		gameArea = document.querySelector('#game-area');
	};

	const renderSelectScreen = () => {
		gameArea.innerHTML = '';
		gameArea.appendChild(selectScreen());
	};

	const renderPlacement = (player) => {
		gameArea.innerHTML = '';
		gameArea.appendChild(placementScreen(player));
	};

	const renderBattle = () => {};

	const renderGameOver = () => {};

	// PubSub
	PubSub.subscribe('GAME STATE CHANGED', (msg, data) => {
		const { currentPlayer, player1, player2, gameStage } = data;
		if (gameStage == 'select') {
			renderSelectScreen();
		}
		if (gameStage == 'placement') {
			renderPlacement(currentPlayer);
			PubSub.publish('PLACEMENT BOARD RENDERED');
		}
	});
	return {
		init,
	};
})();

export default displayController;
