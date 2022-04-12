function placementScreen() {
	const placementScreen = document.createElement('div');
	placementScreen.classList.add('select-screen');

	const msgBox = document.createElement('div');
	msgBox.setAttribute('id', 'msgbox');
	placementScreen.appendChild(msgBox);

	const boardsDiv = document.createElement('div');
	boardsDiv.classList.add('flex-row');

	return placementScreen;
}

export default placementScreen;
