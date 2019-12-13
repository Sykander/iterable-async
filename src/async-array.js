const asyncMap = require('./async-map'),
	asyncForEach = require('./async-for-each'),
	asyncFilter = require('./async-filter'),
	asyncFind = require('./async-find'),
	asyncFindIndex = require('./async-find-index');

/**
 * Create new constructor for Async Array
 * @type {AsyncArray}
 */
class AsyncArray extends Array {}

// Bind async methods
(AsyncArray.prototype.asyncFind = asyncFind),
	(AsyncArray.prototype.asyncFindIndex = asyncFindIndex),
	(AsyncArray.prototype.asyncFilter = asyncFilter),
	(AsyncArray.prototype.asyncForEach = asyncForEach),
	(AsyncArray.prototype.asyncMap = asyncMap);

module.exports = AsyncArray;
