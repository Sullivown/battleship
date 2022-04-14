let selectedShip = null;

function shipyard(ships) {
	const shipyardDiv = document.createElement('div');

	const shipyard = document.createElement('div');
	shipyardDiv.appendChild(shipyard);
	shipyard.classList.add('shipyard');
	for (let ship in ships) {
		if (ships[ship] != null) {
			const shiplength = ships[ship].getLength();
			const shipDiv = document.createElement('div');
			shipDiv.classList.add('ship-outline');
			shipDiv.dataset.shipid = ships[ship].getId();
			shipyard.appendChild(shipDiv);

			for (let i = 0; i < shiplength; i++) {
				const shipSection = document.createElement('div');
				shipSection.classList.add('ship-section');
				shipSection.dataset.section = i;
				shipSection.dataset.shipid = ships[ship].getId();
				shipDiv.appendChild(shipSection);
			}
		}
	}

	return shipyardDiv;
}

export default shipyard;
