/**
 * Async Find
 * ==========
 * Find an item asynchronously and resolve when found or all callbacks resolve
 * @async
 * @param {any[]} iterable
 * @param {Function} callback - callback(currentValue, index, array)
 * @param {any} [thisArg=undefined]
 * @return {Promise<any>}
 * @throws {TypeError}
 */
export function asyncFind(iterable: any[], callback: Function, thisArg?: any): Promise<any>;
