import selectScreen from '../components/selectScreen/selectScreen';
import renderPlacementScreen from '../components/placementScreen/placementScreen';
import renderBattleScreen from '../components/battleScreen/battleScreen';

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
		gameArea.appendChild(renderPlacementScreen(player));
	};

	const renderBattle = (data) => {
		gameArea.innerHTML = '';
		gameArea.appendChild(renderBattleScreen(data));
	};

	const renderGameOver = (data) => {
		gameArea.innerHTML = '';
		gameArea.textContent = `The winner is ${data.winner.getName()}!`;
	};

	// PubSub
	PubSub.subscribe('GAME STATE CHANGED', (msg, data) => {
		const { currentPlayer, player1, player2, gameStage } = data;
		if (gameStage == 'select') {
			renderSelectScreen();
		}
		if (gameStage == 'placement') {
			renderPlacement(currentPlayer);
			PubSub.publish('PLACEMENT SCREEN RENDERED');
		}
		if (gameStage == 'battle') {
			const state = {
				currentPlayer,
				enemyPlayer: getEnemyPlayer(currentPlayer, player1, player2),
			};
			renderBattle(state);
			PubSub.publish('BATTLE SCREEN RENDERED');
		}

		if (gameStage == 'finished') {
			renderGameOver(data.winner);
		}
	});
	return {
		init,
	};
})();

function getEnemyPlayer(currentPlayer, player1, player2) {
	if (currentPlayer == player1) {
		return player2;
	} else {
		return player1;
	}
}

export default displayController;
