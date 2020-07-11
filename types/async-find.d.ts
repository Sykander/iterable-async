/**
 * Async Find
 * ==========
 * Find an item asynchronously and resolve when found or all callbacks resolve
 * @async
 * @param {Object} iterable
 * @param {Function} callback - callback(currentValue, index, array)
 * @param {Object} [thisArg=undefined]
 * @return {any}
 * @throws {TypeError}
 */
export function asyncFind(iterable: any, callback: Function, thisArg?: any): any;
