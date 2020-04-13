const { asyncMapOverIterable } = require('./async-map'),
	{ asyncSortIterable } = require('./async-sort'),
	{ compareByUnicode } = require('./helpers'),
	{ validateIsIterable, validateIsFunction } = require('./validation');

/**
 * Async Map Sort
 * ==============
 * Map asynchronously, then sort asynchronously, then resolve
 * alternatively reject at the first error
 * @async
 * @param {Function} mappingFunction - mappingFunction(currentValue, index, array)
 * @param {Function} [comparisonFunction=compareByUnicode]
 * @return {Array}
 * @throws {TypeError}
 */
const asyncMapSort = (module.exports.asyncMapSort = async function asyncMapSort(
	mappingFunction,
	comparisonFunction = compareByUnicode
) {
	validateIsFunction(mappingFunction);
	validateIsFunction(comparisonFunction);

	return asyncSortIterable(
		await asyncMapOverIterable(this, mappingFunction),
		comparisonFunction
	);
});

/**
 * Async Map Sort Iterable
 * =======================
 * Map an iterable asynchronously, then sort asynchronously, then resolve
 * alternatively reject at the first error
 * @async
 * @param {Object} iterable
 * @param {Function} mappingFunction - mappingFunction(currentValue, index, array)
 * @param {Function} [comparisonFunction=compareByUnicode]
 * @return {Array}
 * @throws {TypeError}
 */
module.exports.asyncMapSortIterable = async function asyncMapSortIterable(
	iterable,
	mappingFunction,
	comparisonFunction = compareByUnicode
) {
	validateIsIterable(iterable);

	return asyncMapSort.call(iterable, mappingFunction, comparisonFunction);
};
