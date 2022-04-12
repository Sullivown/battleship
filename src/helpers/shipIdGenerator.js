let nextShipId = 0;

function shipIdGenerator() {
	const shipId = nextShipId;
	nextShipId += 1;
	return shipId;
}

export default shipIdGenerator;
