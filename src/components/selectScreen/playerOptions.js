import playerType from './playerType';

function playerOptions() {
	const playerOptionsDiv = document.createElement('div');
	playerOptionsDiv.classList.add('flex-row');
	playerOptionsDiv.classList.add('flex-wrap');

	for (let i = 1; i <= 2; i++) {
		const playerSelectDiv = document.createElement('div');
		playerSelectDiv.classList.add('flex-column');
		playerSelectDiv.classList.add('player-select');

		const playerNameInput = document.createElement('input');
		playerNameInput.setAttribute('id', `player-${i}-name`);
		playerNameInput.setAttribute('placeholder', `Player ${i} Name`);
		playerSelectDiv.appendChild(playerNameInput);

		const typeDiv = document.createElement('div');
		typeDiv.classList.add('flex-row');
		typeDiv.classList.add('type-div');
		playerSelectDiv.appendChild(typeDiv);

		typeDiv.appendChild(playerType(i, 'human'));
		typeDiv.appendChild(playerType(i, 'ai'));

		playerOptionsDiv.appendChild(playerSelectDiv);
	}

	return playerOptionsDiv;
}

export default playerOptions;
