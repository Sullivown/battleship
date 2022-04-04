import Ship from './Ship';

test('Happy path create ship', () => {
	let ship = Ship();
	expect(ship).toBe('ship');
});
