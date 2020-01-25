const { validateIsFunction, validateIsIterable } = require('./validation'),
	asyncQuickSort = require('./async-quick-sort'),
	{ compareByUnicode } = require('./helpers');

/**
 * Async Sort
 * ==========
 * Asynchronously sorts and an iterable object and resolves when fully sorted
 * note that the object is sorted in place and no copy is made
 * @async
 * @param {Function} [compare=compareByUnicode] - default is sort by item's unicode value
 * @return {Object}
 * @throws {TypeError}
 */
module.exports = async function asyncSort(compare = compareByUnicode) {
	validateIsIterable(this);
	validateIsFunction(compare);

	await asyncQuickSort(this, 0, this.length - 1, compare);

	return this;
};
