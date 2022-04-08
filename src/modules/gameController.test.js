import gameController from './gameController';

test('Initialized', () => {
	expect(gameController.test()).toBe('test!');
});
