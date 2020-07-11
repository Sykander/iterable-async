/**
 * Async For Each
 * ==============
 * Loop asynchronously and resolve when all callbacks are resolved
 * @async
 * @param {Object} iterable
 * @param {Function} callback - callback(currentValue, index, array)
 * @param {Object} [thisArg=undefined]
 * @throws {TypeError}
 */
export function asyncForEach(iterable: any, callback: Function, thisArg?: any): Promise<void>;
