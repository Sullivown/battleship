function Ship(id, length) {
	let hits = initHits();
	let verticalAlignment = false;
	const getId = () => id;
	const getLength = () => length;
	const getHits = () => hits;

	// Hit location initializer
	function initHits() {
		let hits = [];
		for (let i = 0; i < length; i++) {
			hits.push(false);
		}
		return hits;
	}

	const hit = (location) => {
		hits[location] = true;
	};

	const isSunk = () => {
		const totalHits = hits.reduce((total, curr) => {
			if (curr == true) {
				total += 1;
			}
			return total;
		}, 0);

		if (totalHits == length) {
			return true;
		} else {
			return false;
		}
	};

	return {
		getId,
		getLength,
		getHits,
		hit,
		isSunk,
		verticalAlignment,
	};
}

export default Ship;
