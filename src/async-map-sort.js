const { asyncMap } = require('./async-map'),
	{ asyncSort } = require('./async-sort'),
	{ compareByUnicode } = require('./helpers'),
	{ validateIsIterable, validateIsFunction } = require('./validation');

/**
 * Async Map Sort
 * ==============
 * Map asynchronously, then sort asynchronously, then resolve
 * alternatively reject at the first error
 * @async
 * @param {Object} iterable
 * @param {Function} mappingFunction - mappingFunction(currentValue, index, array)
 * @param {Function} [comparisonFunction=compareByUnicode]
 * @return {Array}
 * @throws {TypeError}
 */
async function asyncMapSort(
	iterable,
	mappingFunction,
	comparisonFunction = compareByUnicode
) {
	validateIsIterable(iterable);
	validateIsFunction(mappingFunction);
	validateIsFunction(comparisonFunction);

	return asyncSort(
		await asyncMap(iterable, mappingFunction),
		comparisonFunction
	);
}

module.exports = { asyncMapSort };
