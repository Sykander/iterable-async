/**
 * Async Find Index
 *
 * Find an item's index asynchronously and resolve when found or all callbacks resolve
 * @async
 * @param {any[]} iterable
 * @param {Function} callback - callback(currentValue, index, array)
 * @param {any} [thisArg=undefined]
 * @return {Promise<Number>} - an integer index, -1 if not found
 * @throws {TypeError}
 */
export function asyncFindIndex(iterable: any[], callback: Function, thisArg?: any): Promise<number>;
