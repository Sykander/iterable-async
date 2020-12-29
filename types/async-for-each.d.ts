/**
 * Async For Each
 *
 * Loop asynchronously and resolve when all callbacks are resolved
 * @async
 * @param {any[]} iterable
 * @param {Function} callback - callback(currentValue, index, array)
 * @param {any} [thisArg=undefined]
 * @return {Promise<void>}
 * @throws {TypeError}
 */
export function asyncForEach(iterable: any[], callback: Function, thisArg?: any): Promise<void>;
