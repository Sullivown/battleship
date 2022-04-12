import PubSub from 'pubsub-js';
import playerOptions from './playerOptions';
import './selectScreen.css';

function selectScreen() {
	const selectScreen = document.createElement('div');
	selectScreen.classList.add('select-screen');

	const p = document.createElement('p');
	p.textContent = 'Player Select:';
	selectScreen.appendChild(p);

	const form = document.createElement('form');
	selectScreen.appendChild(form);
	form.appendChild(playerOptions());

	const controlsDiv = document.createElement('div');
	form.appendChild(controlsDiv);

	const startButton = document.createElement('button');
	startButton.textContent = 'Start Game';
	startButton.type = 'button';
	controlsDiv.append(startButton);

	startButton.addEventListener('click', handleStartClicked);
	return selectScreen;
}

function handleStartClicked(e) {
	e.preventDefault();
	const form = document.querySelector('form');
	let data = {
		player1: {
			name: form.querySelector('#player-1-name').value,
			type: form.querySelector('input[name="player-1-type"]:checked')
				.value,
		},
		player2: {
			name: form.querySelector('#player-2-name').value,
			type: form.querySelector('input[name="player-2-type"]:checked')
				.value,
		},
	};

	PubSub.publish('CREATE NEW GAME', data);
}

export default selectScreen;
