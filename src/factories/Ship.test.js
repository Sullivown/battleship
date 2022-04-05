import Ship from './Ship';

test('Ship object creation', () => {
	let ship = Ship(3);
	expect(ship.getLength()).toEqual(3);
});

test('Ship hit method', () => {
	let ship = Ship(4);
	ship.hit(0);
	expect(ship.getHits()).toEqual([true, false, false, false]);
});

test('Ship isSunk method', () => {
	let ship = Ship(2);
	ship.hit(0);
	ship.hit(1);

	expect(ship.isSunk()).toBe(true);
});
