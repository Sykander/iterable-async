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
 * @class
 * @classdesc Array like object with access to async array methods
 * @augments Array
 */
class AsyncArray extends Array {
	/**
	 * Async Filter
	 *
	 * Filter asynchronously and resolve when all callbacks are resolved
	 * @param {Function} callback
	 * @param {any} [thisArg=undefined]
	 * @return {Promise<any[]>}
	 * @throws {TypeError}
	 */
	asyncFilter(callback, thisArg = undefined) {
		return asyncFilter(this, callback, thisArg);
	}

	/**
	 * Async Filter
	 *
	 * Filter asynchronously and resolve when all callbacks are resolved
	 * @static
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
	 * Async Find Index
	 *
	 * Find an item's index asynchronously and resolve when found or all callbacks resolve
	 * @param {Function} callback
	 * @param {any} [thisArg=undefined]
	 * @return {Promise<Number>}
	 * @throws {TypeError}
	 */
	asyncFindIndex(callback, thisArg = undefined) {
		return asyncFindIndex(this, callback, thisArg);
	}

	/**
	 * Async Find Index
	 *
	 * Find an item's index asynchronously and resolve when found or all callbacks resolve
	 * @static
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
	 * Async Find
	 *
	 * Find an item asynchronously and resolve when found or all callbacks resolve
	 * @param {Function} callback
	 * @param {any} [thisArg=undefined]
	 * @return {Promise<any>}
	 * @throws {TypeError}
	 */
	asyncFind(callback, thisArg = undefined) {
		return asyncFind(this, callback, thisArg);
	}

	/**
	 * Async Find
	 *
	 * Find an item asynchronously and resolve when found or all callbacks resolve
	 * @static
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
	 * Async For Each
	 *
	 * Loop asynchronously and resolve when all callbacks are resolved
	 * @param {Function} callback
	 * @param {any} [thisArg=undefined]
	 * @return {Promise<undefined>}
	 * @throws {TypeError}
	 */
	asyncForEach(callback, thisArg = undefined) {
		return asyncForEach(this, callback, thisArg);
	}

	/**
	 * Async For Each
	 *
	 * Loop asynchronously and resolve when all callbacks are resolved
	 * @static
	 * @param {any[]} iterable
	 * @param {Function} callback
	 * @param {any} [thisArg=undefined]
	 * @return {Promise<undefined>}
	 * @throws {TypeError}
	 */
	static asyncForEach(iterable, callback, thisArg = undefined) {
		return asyncForEach(iterable, callback, thisArg);
	}

	/**
	 * Async Map Sort
	 *
	 * Map asynchronously, then sort asynchronously
	 * (although you should use a synchronous function here if possible)
	 * then resolve
	 * alternatively reject at the first error
	 * @param {Function} mappingCallback
	 * @param {Function} [comparisonCallback=compareByUnicode]
	 * @return {Promise<any[]>}
	 * @throws {TypeError}
	 */
	asyncMapSort(mappingCallback, comparisonCallback = compareByUnicode) {
		return asyncMapSort(this, mappingCallback, comparisonCallback);
	}

	/**
	 * Async Map Sort
	 *
	 * Map asynchronously, then sort asynchronously
	 * (although you should use a synchronous function here if possible)
	 * then resolve
	 * alternatively reject at the first error
	 * @static
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
	 * Async Map
	 *
	 * Map asynchronously and resolve when all callbacks are resolved
	 * @param {Function} callback
	 * @param {any} [thisArg=undefined]
	 * @return {Promise<any[]>}
	 * @throws {TypeError}
	 */
	asyncMap(callback, thisArg = undefined) {
		return asyncMap(this, callback, thisArg);
	}

	/**
	 * Async Map
	 *
	 * Map asynchronously and resolve when all callbacks are resolved
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
	 * Async Reduce
	 *
	 * Reduce asynchronously and resolve when
	 * all items have been transduced.
	 * @param {Function} callback
	 * @param {any} [accumulator=noParam]
	 * @return {Promise<any>}
	 * @throws {TypeError}
	 */
	asyncReduce(callback, accumulator = noParam) {
		return asyncReduce(this, callback, accumulator);
	}

	/**
	 * Async Reduce
	 *
	 * Reduce asynchronously and resolve when
	 * all items have been transduced.
	 * @static
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
	 * Async Sort
	 *
	 * Asynchronously sorts and resolves when fully sorted
	 * note that the object is sorted in place and no copy is made
	 * @param {Function} [callback=compareByUnicode]
	 * @return {Promise<this>}
	 * @throws {TypeError}
	 */
	asyncSort(callback = compareByUnicode) {
		return asyncSort(this, callback);
	}

	/**
	 * Async Sort
	 *
	 * Asynchronously sorts and resolves when fully sorted
	 * note that the object is sorted in place and no copy is made
	 * @static
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
