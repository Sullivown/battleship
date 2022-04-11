import HumanPic from '../../assets/images/human.svg';
import RobotPic from '../../assets/images/robot.svg';

function playerOptions() {
	const playerOptionsDiv = document.createElement('div');
	playerOptionsDiv.classList.add('player-options');

	for (let i = 1; i <= 2; i++) {
		const playerSelectDiv = document.createElement('div');
		playerSelectDiv.classList.add('player-select');
		const playerNameInput = document.createElement('input');
		playerNameInput.setAttribute('id', `player-${i}-name`);
		playerNameInput.setAttribute('placeholder', `Player ${i} Name`);
		playerSelectDiv.appendChild(playerNameInput);

		const typeDiv = document.createElement('div');
		typeDiv.classList.add('type-div');
		playerSelectDiv.appendChild(typeDiv);

		const radioDivA = document.createElement('div');
		radioDivA.classList.add('radio-div');
		typeDiv.appendChild(radioDivA);

		const playerTypeA = document.createElement('input');
		playerTypeA.setAttribute('type', 'radio');
		playerTypeA.setAttribute('name', `player-${i}-type`);
		playerTypeA.setAttribute('id', `player-${i}-human`);
		playerTypeA.setAttribute('value', 'human');

		if (i == 1) {
			playerTypeA.setAttribute('checked', true);
		}

		radioDivA.appendChild(playerTypeA);

		const playerTypeALabel = document.createElement('label');
		playerTypeALabel.textContent = 'Human';
		playerTypeALabel.setAttribute('for', `player-${i}-human`);
		radioDivA.appendChild(playerTypeALabel);

		const playerTypeAImg = new Image();
		playerTypeAImg.src = HumanPic;
		playerTypeAImg.setAttribute('for', `player-${i}-human`);
		playerTypeALabel.appendChild(playerTypeAImg);

		const radioDivB = document.createElement('div');
		radioDivB.classList.add('radio-div');
		typeDiv.appendChild(radioDivB);

		const playerTypeB = document.createElement('input');
		playerTypeB.setAttribute('type', 'radio');
		playerTypeB.setAttribute('name', `player-${i}-type`);
		playerTypeB.setAttribute('id', `player-${i}-computer`);
		playerTypeB.setAttribute('value', 'computer');

		if (i == 2) {
			playerTypeB.setAttribute('checked', true);
		}

		radioDivB.appendChild(playerTypeB);

		const playerTypeBLabel = document.createElement('label');
		playerTypeBLabel.textContent = 'AI';
		playerTypeBLabel.setAttribute('for', `player-${i}-computer`);
		radioDivB.appendChild(playerTypeBLabel);

		const playerTypeBImg = new Image();
		playerTypeBImg.src = RobotPic;
		playerTypeBLabel.appendChild(playerTypeBImg);

		playerOptionsDiv.appendChild(playerSelectDiv);
	}

	return playerOptionsDiv;
}

export default playerOptions;
