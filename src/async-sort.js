const { noParam } = require('./constants'),
	{ validateIsFunction, validateIsIterable } = require('./validation'),
	asyncQuickSort = require('./async-quick-sort'),
	{ compareByUnicode } = require('./helpers');

/**
 * Async Sort
 * ==========
 * Asynchronously sorts and an iterable object and resolves when fully sorted
 * note that the object is sorted in place and no copy is made
 * @async
 * @param {Function} [compareFunc] - default is sort by item's unicode value
 * @return {Object}
 */
module.exports = async function asyncSort(compareFunc = noParam) {
	validateIsIterable(this);

	const compare = compareFunc !== noParam ? compareFunc : compareByUnicode;

	validateIsFunction(compare);

	await asyncQuickSort(this, 0, this.length - 1, compare);

	return this;
};
