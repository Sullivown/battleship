import shipIdGenerator from './shipIdGenerator';

test('Generate ship Id', () => {
	const id1 = shipIdGenerator();
	const id2 = shipIdGenerator();

	expect(id1).toBe(0);
	expect(id2).toBe(1);
});
