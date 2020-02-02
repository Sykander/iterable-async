const { asyncMap, asyncMapOverIterable } = require('./async-map'),
	{ asyncForEach, asyncForEachOfIterable } = require('./async-for-each'),
	{ asyncFilter, asyncFilterIterable } = require('./async-filter'),
	{ asyncFind, asyncFindInIterable } = require('./async-find'),
	{
		asyncFindIndex,
		asyncFindIndexOnIterable
	} = require('./async-find-index'),
	{ asyncSort, asyncSortIterable } = require('./async-sort');

/**
 * Async Array
 * ===========
 * Array like object with access to async array methods
 * @type {AsyncArray}
 */
class AsyncArray extends Array {}

// Bind static async methods
(AsyncArray.asyncFind = asyncFindInIterable),
	(AsyncArray.asyncFindIndex = asyncFindIndexOnIterable),
	(AsyncArray.asyncFilter = asyncFilterIterable),
	(AsyncArray.asyncForEach = asyncForEachOfIterable),
	(AsyncArray.asyncMap = asyncMapOverIterable),
	(AsyncArray.asyncSort = asyncSortIterable);

// Bind async methods
(AsyncArray.prototype.asyncFind = asyncFind),
	(AsyncArray.prototype.asyncFindIndex = asyncFindIndex),
	(AsyncArray.prototype.asyncFilter = asyncFilter),
	(AsyncArray.prototype.asyncForEach = asyncForEach),
	(AsyncArray.prototype.asyncMap = asyncMap),
	(AsyncArray.prototype.asyncSort = asyncSort);

module.exports = AsyncArray;
