const { asyncFind } = require('./async-find'),
	{ asyncFindIndex } = require('./async-find-index'),
	{ asyncFilter } = require('./async-filter'),
	{ asyncForEach } = require('./async-for-each'),
	{ asyncMap } = require('./async-map'),
	{ asyncMapSort } = require('./async-map-sort'),
	{ asyncReduce } = require('./async-reduce'),
	{ asyncSort } = require('./async-sort'),
	{ compareByUnicode } = require('./helpers'),
	{ noParam } = require('./constants');

/**
 * Async Array
 * ===========
 * Array like object with access to async array methods
 * @class
 * @extends Array
 */
class AsyncArray extends Array {
	/**
	 * @async
	 * @param {Function} callback
	 * @param {any} [thisArg=undefined]
	 * @return {Promise<any[]>}
	 * @throws {TypeError}
	 */
	asyncFilter(callback, thisArg = undefined) {
		return asyncFilter(this, callback, thisArg);
	}

	/**
	 * @async
	 * @param {any[]} iterable
	 * @param {Function} callback
	 * @param {any} [thisArg=undefined]
	 * @return {Promise<any[]>}
	 * @throws {TypeError}
	 */
	static asyncFilter(iterable, callback, thisArg = undefined) {
		return asyncFilter(iterable, callback, thisArg);
	}

	/**
	 * @async
	 * @param {Function} callback
	 * @param {any} [thisArg=undefined]
	 * @return {Promise<any>}
	 * @throws {TypeError}
	 */
	asyncFind(callback, thisArg = undefined) {
		return asyncFind(this, callback, thisArg);
	}

	/**
	 * @async
	 * @param {any[]} iterable
	 * @param {Function} callback
	 * @param {any} [thisArg=undefined]
	 * @return {Promise<any>}
	 * @throws {TypeError}
	 */
	static asyncFind(iterable, callback, thisArg = undefined) {
		return asyncFind(iterable, callback, thisArg);
	}

	/**
	 * @async
	 * @param {Function} callback
	 * @param {any} [thisArg=undefined]
	 * @return {Promise<Number>}
	 * @throws {TypeError}
	 */
	asyncFindIndex(callback, thisArg = undefined) {
		return asyncFindIndex(this, callback, thisArg);
	}

	/**
	 * @async
	 * @param {any[]} iterable
	 * @param {Function} callback
	 * @param {any} [thisArg=undefined]
	 * @return {Promise<Number>}
	 * @throws {TypeError}
	 */
	static asyncFindIndex(iterable, callback, thisArg = undefined) {
		return asyncFindIndex(iterable, callback, thisArg);
	}

	/**
	 * @async
	 * @param {Function} callback
	 * @param {any} [thisArg=undefined]
	 * @throws {TypeError}
	 */
	asyncForEach(callback, thisArg = undefined) {
		return asyncForEach(this, callback, thisArg);
	}

	/**
	 * @async
	 * @param {any[]} iterable
	 * @param {Function} callback
	 * @param {any} [thisArg=undefined]
	 * @throws {TypeError}
	 */
	static asyncForEach(iterable, callback, thisArg = undefined) {
		return asyncForEach(iterable, callback, thisArg);
	}

	/**
	 * @async
	 * @param {Function} callback
	 * @param {any} [thisArg=undefined]
	 * @return {Promise<any[]>}
	 * @throws {TypeError}
	 */
	asyncMap(callback, thisArg = undefined) {
		return asyncMap(this, callback, thisArg);
	}

	/**
	 * @async
	 * @param {any[]} iterable
	 * @param {Function} callback
	 * @param {any} [thisArg=undefined]
	 * @return {Promise<any[]>}
	 * @throws {TypeError}
	 */
	static asyncMap(iterable, callback, thisArg = undefined) {
		return asyncMap(iterable, callback, thisArg);
	}

	/**
	 * @async
	 * @param {Function} mappingCallback
	 * @param {Function} [comparisonCallback=compareByUnicode]
	 * @return {Promise<any[]>}
	 * @throws {TypeError}
	 */
	asyncMapSort(mappingCallback, comparisonCallback = compareByUnicode) {
		return asyncMapSort(this, mappingCallback, comparisonCallback);
	}

	/**
	 * @async
	 * @param {any[]} iterable
	 * @param {Function} mappingCallback
	 * @param {Function} [comparisonCallback=compareByUnicode]
	 * @return {Promise<any[]>}
	 * @throws {TypeError}
	 */
	static asyncMapSort(
		iterable,
		mappingCallback,
		comparisonCallback = compareByUnicode
	) {
		return asyncMapSort(iterable, mappingCallback, comparisonCallback);
	}

	/**
	 * @async
	 * @param {Function} callback
	 * @param {any} [accumulator=noParam]
	 * @return {Promise<any>}
	 * @throws {TypeError}
	 */
	asyncReduce(callback, accumulator = noParam) {
		return asyncReduce(this, callback, accumulator);
	}

	/**
	 * @async
	 * @param {any[]} iterable
	 * @param {Function} callback
	 * @param {any} [accumulator=noParam]
	 * @return {Promise<any>}
	 * @throws {TypeError}
	 */
	static asyncReduce(iterable, callback, accumulator = noParam) {
		return asyncReduce(iterable, callback, accumulator);
	}

	/**
	 * @async
	 * @param {Function} [callback=compareByUnicode]
	 * @return {Promise<this>}
	 * @throws {TypeError}
	 */
	asyncSort(callback = compareByUnicode) {
		return asyncSort(this, callback);
	}

	/**
	 * @async
	 * @param {any[]} iterable
	 * @param {Function} [callback=compareByUnicode]
	 * @return {Promise<any[]>}
	 * @throws {TypeError}
	 */
	static asyncSort(iterable, callback = compareByUnicode) {
		return asyncSort(iterable, callback);
	}
}

// module.exports = { AsyncArray };
// ts(9006)
// Need to `export` the class instead
module.exports = AsyncArray;
