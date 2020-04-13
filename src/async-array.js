const { asyncFind, asyncFindInIterable } = require('./async-find'),
	{
		asyncFindIndex,
		asyncFindIndexOnIterable
	} = require('./async-find-index'),
	{ asyncFilter, asyncFilterIterable } = require('./async-filter'),
	{ asyncForEach, asyncForEachOfIterable } = require('./async-for-each'),
	{ asyncMap, asyncMapOverIterable } = require('./async-map'),
	{ asyncMapSort, asyncMapSortIterable } = require('./async-map-sort'),
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
	asyncMapSort: asyncMapSortIterable,
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
	asyncMapSort,
	asyncReduce,
	asyncSort
});

module.exports = AsyncArray;
