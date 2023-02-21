const { validateIsFunction, validateIsIterable } = require('./validation'),
	{ asyncQuickSort } = require('./async-quick-sort'),
	{ compareByUnicode } = require('./helpers');

/**
 * Async Sort
 *
 * Asynchronously sorts and resolves when fully sorted
 * note that the object is sorted in place and no copy is made
 * @async
 * @param {any[]} iterable
 * @param {Function} [compare=compareByUnicode] - default is sort by item's unicode value
 * @return {Promise<iterable>} returns original iterable
 * @throws {TypeError}
 */
async function asyncSort(iterable, compare = compareByUnicode) {
	validateIsIterable(iterable);
	validateIsFunction(compare);

	await asyncQuickSort(iterable, 0, iterable.length - 1, compare);

	return iterable;
}

module.exports = { asyncSort };
