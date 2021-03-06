import selectScreen from '../components/selectScreen/selectScreen';
import renderPlacementScreen from '../components/placementScreen/placementScreen';
import renderBattleScreen from '../components/battleScreen/battleScreen';
import renderGameOverScreen from '../components/gameOverScreen/gameOverScreen';

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

	const renderPlacement = (data) => {
		gameArea.innerHTML = '';
		gameArea.appendChild(renderPlacementScreen(data));
	};

	const renderBattle = (state) => {
		gameArea.innerHTML = '';
		gameArea.appendChild(renderBattleScreen(state));
	};

	const renderGameOver = (state) => {
		gameArea.innerHTML = '';
		gameArea.appendChild(renderGameOverScreen(state));
	};

	// PubSub
	PubSub.subscribe('GAME STATE CHANGED', (msg, data) => {
		const {
			currentPlayer,
			player1,
			player2,
			gameStage,
			winner,
			bothHuman,
		} = data;

		if (gameStage == 'select') {
			renderSelectScreen();
		}
		if (gameStage == 'placement') {
			renderPlacement(data);
			PubSub.publish('PLACEMENT SCREEN RENDERED');
		}
		if (gameStage == 'battle') {
			const state = {
				currentPlayer,
				enemyPlayer: getEnemyPlayer(currentPlayer, player1, player2),
				bothHuman,
			};
			renderBattle(state);
			PubSub.publish('BATTLE SCREEN RENDERED');
		}

		if (gameStage == 'finished') {
			const state = {
				currentPlayer: winner,
				enemyPlayer: getEnemyPlayer(winner, player1, player2),
				winner,
				player1,
				player2,
			};
			renderGameOver(state);
			PubSub.publish('GAME OVER SCREEN RENDERED');
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
