/**
 * Async Map
 * =========
 * Map asynchronously and resolve when all callbacks are resolved
 * @async
 * @param {Object} iterable
 * @param {Function} callback - callback(currentValue, index, array)
 * @param {Object} [thisArg=undefined]
 * @return {Array}
 * @throws {TypeError}
 */
export function asyncMap(iterable: any, callback: Function, thisArg?: any): any[];
