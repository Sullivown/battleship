import './passScreen.css';

function renderPassScreen(player) {
	const passScreen = document.createElement('div');
	passScreen.setAttribute('id', 'pass-screen');
	passScreen.classList.add('flex-column');

	const passMsg = document.createElement('p');
	passMsg.textContent = `Pass the device to ${player}.`;
	passScreen.appendChild(passMsg);

	const dismissBtn = document.createElement('button');
	dismissBtn.setAttribute('id', 'dismiss-btn');
	dismissBtn.textContent = 'Done!';
	dismissBtn.addEventListener('click', dismissPassScreen);
	passScreen.appendChild(dismissBtn);

	return passScreen;
}

function dismissPassScreen() {
	const btn = document.querySelector('#dismiss-btn');
	btn.removeEventListener('click', dismissPassScreen);

	const passScreen = document.querySelector('#pass-screen');
	passScreen.remove();
}

export default renderPassScreen;
