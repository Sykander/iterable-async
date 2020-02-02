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
const asyncSort = (module.exports.asyncSort = async function asyncSort(
	compare = compareByUnicode
) {
	validateIsFunction(compare);

	await asyncQuickSort(this, 0, this.length - 1, compare);

	return this;
});

/**
 * Async Sort Iterable
 * ===================
 * Asynchronously sorts and an iterable object and resolves when fully sorted
 * note that the object is sorted in place and no copy is made
 * @async
 * @param {Object} iterable
 * @param {Function} [compare=compareByUnicode] - default is sort by item's unicode value
 * @return {Object}
 * @throws {TypeError}
 */
module.exports.asyncSortIterable = async function asyncSortIterable(
	iterable,
	compare = compareByUnicode
) {
	validateIsIterable(iterable);

	return asyncSort.call(iterable, compare);
};
