const { validateIsFunction, validateIsIterable } = require('./validation'),
	{ asyncQuickSort } = require('./async-quick-sort'),
	{ compareByUnicode } = require('./helpers');

/**
 * Async Sort
 * ==========
 * Asynchronously sorts and resolves when fully sorted
 * note that the object is sorted in place and no copy is made
 * @async
 * @param {Object} iterable
 * @param {Function} [compare=compareByUnicode] - default is sort by item's unicode value
 * @return {Object}
 * @throws {TypeError}
 */
async function asyncSort(iterable, compare = compareByUnicode) {
	validateIsIterable(iterable);
	validateIsFunction(compare);

	await asyncQuickSort(iterable, 0, iterable.length - 1, compare);

	return iterable;
}

module.exports = { asyncSort };
