/**
 * Async Find Index
 * ================
 * Find an item's index asynchronously and resolve when found or all callbacks resolve
 * @async
 * @param {Object} iterable
 * @param {Function} callback - callback(currentValue, index, array)
 * @param {Object} [thisArg=undefined]
 * @return {Number} - an integer index, -1 if not found
 * @throws {TypeError}
 */
export function asyncFindIndex(iterable: any, callback: Function, thisArg?: any): number;
