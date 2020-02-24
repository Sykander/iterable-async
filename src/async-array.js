const { asyncMap, asyncMapOverIterable } = require('./async-map'),
	{ asyncForEach, asyncForEachOfIterable } = require('./async-for-each'),
	{ asyncFilter, asyncFilterIterable } = require('./async-filter'),
	{ asyncFind, asyncFindInIterable } = require('./async-find'),
	{
		asyncFindIndex,
		asyncFindIndexOnIterable
	} = require('./async-find-index'),
	{ asyncReduce, asyncReduceIterable } = require('./async-reduce'),
	{ asyncSort, asyncSortIterable } = require('./async-sort');

/**
 * Async Array
 * ===========
 * Array like object with access to async array methods
 * @type {AsyncArray}
 */
class AsyncArray extends Array {}

// Add static methods
Object.assign(AsyncArray, {
	asyncFind: asyncFindInIterable,
	asyncFindIndex: asyncFindIndexOnIterable,
	asyncFilter: asyncFilterIterable,
	asyncForEach: asyncForEachOfIterable,
	asyncMap: asyncMapOverIterable,
	asyncReduce: asyncReduceIterable,
	asyncSort: asyncSortIterable
});

// Create prototype methods
Object.assign(AsyncArray.prototype, {
	asyncFind,
	asyncFindIndex,
	asyncFilter,
	asyncForEach,
	asyncMap,
	asyncReduce,
	asyncSort
});

module.exports = AsyncArray;
