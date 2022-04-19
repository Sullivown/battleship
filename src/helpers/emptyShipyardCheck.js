function emptyShipyardCheck(shipyard) {
	for (let i = 0, length = shipyard.length; i < length; i++) {
		if (shipyard[i] != null) {
			return false;
		}
	}

	return true;
}

export default emptyShipyardCheck;
