const asyncMap = require('./async-map'),
	asyncForEach = require('./async-for-each'),
	asyncFilter = require('./async-filter'),
	asyncFind = require('./async-find'),
	asyncFindIndex = require('./async-find-index'),
	asyncSort = require('./async-sort'),
	asyncReduce = require('./async-reduce');

/**
 * Async Array
 * ===========
 * Array like object with access to async array methods
 * @type {AsyncArray}
 */
class AsyncArray extends Array {}

// Bind async methods
(AsyncArray.prototype.asyncFind = asyncFind),
	(AsyncArray.prototype.asyncFindIndex = asyncFindIndex),
	(AsyncArray.prototype.asyncFilter = asyncFilter),
	(AsyncArray.prototype.asyncForEach = asyncForEach),
	(AsyncArray.prototype.asyncMap = asyncMap),
	(AsyncArray.prototype.asyncSort = asyncSort),
	(AsyncArray.prototype.asyncReduce = asyncReduce);

module.exports = AsyncArray;
