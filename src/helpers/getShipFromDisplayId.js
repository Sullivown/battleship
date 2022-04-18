function getShipFromDisplayId(shipId, board, shipyard) {
	let ship;
	let location;
	let shipyardIndex;

	ship = shipyard.find((element) => {
		if (element != null) {
			return element.getId() == shipId;
		}
	});

	if (ship) {
		shipyardIndex = shipyard.findIndex((element) => {
			if (element != null) {
				return element.getId() == shipId;
			}
		});
		location = 'shipyard';
	}

	if (!ship) {
		const currentBoard = board;
		for (let i = 0, rows = board.length; i < rows; i++) {
			let cellSearch = currentBoard[i].find((element) => {
				if (element.ship != null) {
					return element.ship.getId() == shipId;
				}
			});
			if (cellSearch) {
				ship = cellSearch.ship;
			}
		}
		location = 'board';
	}

	return { ship, location, shipyardIndex };
}

export default getShipFromDisplayId;
