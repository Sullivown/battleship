import selectScreen from '../components/selectScreen/selectScreen';

const displayController = (() => {
	// DOM cache
	const body = document.querySelector('body');
	let app;

	const init = () => {
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

	const renderGame = () => {};

	const renderGameOver = () => {};

	return {
		init,
	};
})();

export default displayController;
