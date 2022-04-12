import HumanPic from '../../assets/images/human.svg';
import RobotPic from '../../assets/images/robot.svg';

function playerType(i, type) {
	const radioDiv = document.createElement('div');
	radioDiv.classList.add('flex-column');
	radioDiv.classList.add('radio-div');

	const playerType = document.createElement('input');
	playerType.setAttribute('type', 'radio');
	playerType.setAttribute('name', `player-${i}-type`);
	playerType.setAttribute('id', `player-${i}-human`);
	playerType.setAttribute('value', 'human');

	if (type == 'human') {
		playerType.setAttribute('checked', true);
		radioDiv.classList.add('selected');
	}

	radioDiv.appendChild(playerType);

	const playerTypeLabel = document.createElement('label');
	playerTypeLabel.textContent = type == 'human' ? 'Human' : 'AI';
	playerTypeLabel.setAttribute('for', `player-${i}-${type}`);
	radioDiv.appendChild(playerTypeLabel);

	const playerTypeImg = new Image();
	playerTypeImg.src = type == 'human' ? HumanPic : RobotPic;
	playerTypeImg.setAttribute('for', `player-${i}-${type}`);
	playerTypeLabel.appendChild(playerTypeImg);

	radioDiv.addEventListener('click', select);

	return radioDiv;
}

function select(e) {
	const typeDiv = e.target.closest('.type-div');
	const currSelected = typeDiv.querySelector('.selected');
	currSelected.classList.remove('selected');

	const radioDiv = e.target.closest('.radio-div');
	radioDiv.classList.add('selected');
	radioDiv.querySelector('input[type="radio"]').checked = true;
}

export default playerType;
