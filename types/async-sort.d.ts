/**
 * Async Sort
 * ==========
 * Asynchronously sorts and resolves when fully sorted
 * note that the object is sorted in place and no copy is made
 * @async
 * @param {Object} iterable
 * @param {Function} [compare=compareByUnicode] - default is sort by item's unicode value
 * @return {Object}
 * @throws {TypeError}
 */
export function asyncSort(iterable: any, compare?: Function): any;
