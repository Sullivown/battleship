let selectedShip = null;

function shipyard(ships) {
	const shipyard = document.createElement('div');
	shipyard.classList.add('shipyard');
	for (let ship in ships) {
		const shiplength = ships[ship].getLength();
		const shipDiv = document.createElement('div');
		shipDiv.classList.add('ship');
		shipDiv.dataset.shipid = ships[ship].getId();
		shipyard.appendChild(shipDiv);
		shipDiv.addEventListener('click', selectShip);

		for (let i = 0; i < shiplength; i++) {
			const shipSection = document.createElement('div');
			shipSection.classList.add('ship-section');
			shipSection.dataset.section = i;
			shipDiv.appendChild(shipSection);
		}
	}

	return shipyard;
}

function selectShip() {
	const currSelected = document.querySelector('.ship-selected');
	if (currSelected) {
		currSelected.classList.remove('ship-selected');
	}

	selectedShip = this.dataset.shipid;
	document
		.querySelector(`[data-shipid='${selectedShip}']`)
		.classList.add('ship-selected');

	PubSub.publish('SHIP SELECTED PLACEMENT', { selectedShip });
}

export default shipyard;
