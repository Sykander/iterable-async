const { asyncFind } = require('./async-find'),
	{ asyncFindIndex } = require('./async-find-index'),
	{ asyncFilter } = require('./async-filter'),
	{ asyncForEach } = require('./async-for-each'),
	{ asyncMap } = require('./async-map'),
	{ asyncMapSort } = require('./async-map-sort'),
	{ asyncReduce } = require('./async-reduce'),
	{ asyncSort } = require('./async-sort'),
	{ compareByUnicode } = require('./helpers');

/**
 * Async Array
 * ===========
 * Array like object with access to async array methods
 * @class
 * @extends Array
 */
class AsyncArray extends Array {
	asyncFilter(callback, thisArg = undefined) {
		return asyncFilter(this, callback, thisArg);
	}

	static asyncFilter(iterable, callback, thisArg = undefined) {
		return asyncFilter(iterable, callback, thisArg);
	}

	asyncFind(callback, thisArg = undefined) {
		return asyncFind(this, callback, thisArg);
	}

	static asyncFind(iterable, callback, thisArg = undefined) {
		return asyncFind(iterable, callback, thisArg);
	}

	asyncFindIndex(callback, thisArg = undefined) {
		return asyncFindIndex(this, callback, thisArg);
	}

	static asyncFindIndex(iterable, callback, thisArg = undefined) {
		return asyncFindIndex(iterable, callback, thisArg);
	}

	asyncForEach(callback, thisArg = undefined) {
		return asyncForEach(this, callback, thisArg);
	}

	static asyncForEach(iterable, callback, thisArg = undefined) {
		return asyncForEach(iterable, callback, thisArg);
	}

	asyncMap(callback, thisArg = undefined) {
		return asyncMap(this, callback, thisArg);
	}

	static asyncMap(iterable, callback, thisArg = undefined) {
		return asyncMap(iterable, callback, thisArg);
	}

	asyncMapSort(mappingCallback, comparisonCallback = compareByUnicode) {
		return asyncMapSort(this, mappingCallback, comparisonCallback);
	}

	static asyncMapSort(
		iterable,
		mappingCallback,
		comparisonCallback = compareByUnicode
	) {
		return asyncMapSort(iterable, mappingCallback, comparisonCallback);
	}

	asyncReduce(callback, accumulator = undefined) {
		return asyncReduce(this, callback, accumulator);
	}

	static asyncReduce(iterable, callback, accumulator = undefined) {
		return asyncReduce(iterable, callback, accumulator);
	}

	asyncSort(callback = compareByUnicode) {
		return asyncSort(this, callback);
	}

	static asyncSort(iterable, callback = compareByUnicode) {
		return asyncSort(iterable, callback);
	}
}

module.exports = { AsyncArray };
