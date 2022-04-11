import playerOptions from './playerOptions';
import './selectScreen.css';

function selectScreen() {
	const selectScreen = document.createElement('div');
	selectScreen.classList.add('select-screen');

	const titleDiv = document.createElement('div');
	selectScreen.appendChild(titleDiv);

	const p = document.createElement('p');
	p.textContent = 'Player Select:';

	selectScreen.appendChild(p);

	const title = document.createElement('h1');
	title.textContent = 'BattleShip';
	titleDiv.appendChild(title);

	selectScreen.appendChild(playerOptions());

	const controlsDiv = document.createElement('div');
	selectScreen.appendChild(controlsDiv);

	const startButton = document.createElement('button');
	startButton.textContent = 'Start Game';
	controlsDiv.append(startButton);

	return selectScreen;
}

export default selectScreen;
