import Ship from './Ship';

test('Ship length and hits on creation', () => {
	let ship = Ship(0, 3);
	expect(ship.getLength()).toBe(3);
	expect(ship.getHits()).toEqual([false, false, false]);
});

test('Ship hit method', () => {
	let ship = Ship(0, 4);
	ship.hit(0);
	expect(ship.getHits()).toEqual([true, false, false, false]);
});

test('Ship isSunk method', () => {
	const ship = Ship(0, 2);
	ship.hit(0);
	ship.hit(1);
	expect(ship.isSunk()).toBe(true);
});
