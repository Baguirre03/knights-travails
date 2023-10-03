const KT = require('./attemptTwo');

test('test one', () => {
  expect(KT([1, 1], [2, 3])).toBe('Path taken: -> [1, 1] -> [2, 3]');
});

test('test two', () => {
  expect(KT([1, 1], [4, 4])).toBe('Path taken: -> [1, 1] -> [2, 3] -> [4, 4]');
});

test('test three', () => {
  expect(KT([4, 4], [1, 1])).toBe('Path taken: -> [4, 4] -> [3, 2] -> [1, 1]');
});
