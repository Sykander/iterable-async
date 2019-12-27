const { noParam } = require('./constants'),
	{ validateIsFunction, validateIsIterable } = require('./validation');

/**
 * Async Sort
 * ==========
 * Asynchronously sorts and an iterable object and resolves when fully sorted
 * note that the object is sorted in place and no copy is made
 * @async
 * @param {Function} [callback] - default is sort by item's unicode value
 * @return {Object}
 */
module.exports = async function asyncSort(callback = noParam) {
	validateIsIterable(this);

	if (callback !== noParam) {
		validateIsFunction(callback);
		return this.sort(callback);
	} else {
		return this.sort();
	}
};
