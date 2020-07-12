/**
 * Async Map
 * =========
 * Map asynchronously and resolve when all callbacks are resolved
 * @async
 * @param {any[]} iterable
 * @param {Function} callback - callback(currentValue, index, array)
 * @param {any} [thisArg=undefined]
 * @return {Promise<any[]>}
 * @throws {TypeError}
 */
export function asyncMap(iterable: any[], callback: Function, thisArg?: any): Promise<any[]>;
