function shipyard(ships) {
	const shipyard = document.createElement('div');
	shipyard.classList.add('shipyard');
	for (let ship in ships) {
		const shiplength = ships[ship].getLength();
		const shipDiv = document.createElement('div');
		shipDiv.classList.add('ship');
		shipDiv.dataset.shipid = ships[ship].getId();
		shipyard.appendChild(shipDiv);

		for (let i = 0; i < shiplength; i++) {
			const shipSection = document.createElement('div');
			shipSection.classList.add('ship-section');
			shipSection.dataset.section = i;
			shipDiv.appendChild(shipSection);
		}
	}

	return shipyard;
}

export default shipyard;
