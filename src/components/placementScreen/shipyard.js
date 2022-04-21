function shipyard(ships) {
	const shipyardDiv = document.createElement('div');
	shipyardDiv.classList.add('flex-column', 'wrap');

	const heading = document.createElement('h2');
	heading.textContent = 'Shipyard';
	shipyardDiv.appendChild(heading);

	const p = document.createElement('p');
	p.textContent =
		'Click to select a ship, then click on a valid square on the board to place the ship. Use SPACEBAR to change alignment.';
	shipyardDiv.appendChild(p);

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
				shipSection.dataset.verticalAlignment =
					ships[ship].verticalAlignment;
				shipDiv.appendChild(shipSection);
			}
		}
	}

	return shipyardDiv;
}

export default shipyard;
