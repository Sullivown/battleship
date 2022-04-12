import selectScreen from '../components/selectScreen/selectScreen';
import placementScreen from '../components/placementScreen/placementScreen';

const displayController = (() => {
	// DOM cache
	const body = document.querySelector('body');
	let app;
	let messageBox;

	const init = () => {
		const header = document.createElement('header');
		header.setAttribute('id', 'header');
		body.appendChild(header);
		const title = document.createElement('h1');
		title.textContent = 'BattleShip';
		header.appendChild(title);

		const appDiv = document.createElement('div');
		appDiv.setAttribute('id', 'app');
		body.appendChild(appDiv);

		app = document.querySelector('#app');

		renderSelectScreen();
	};

	const renderSelectScreen = () => {
		app.innerHTML = '';
		app.appendChild(selectScreen());
	};

	const renderPlacement = () => {
		app.innerHTML = '';
		app.appendChild(placementScreen());
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
			renderPlacement();
		}
	});
	return {
		init,
	};
})();

export default displayController;
