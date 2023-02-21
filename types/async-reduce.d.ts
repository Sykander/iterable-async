/**
 * Async Reduce
 *
 * Reduce asynchronously and resolve when
 * all items have been transduced.
 * @async
 * @param {any[]} iterable
 * @param {Function} callback - callback(accumulator, currentValue, index, array)
 * @param {any} [accumulator=noParam]
 * @return {Promise<any>}
 * @throws {TypeError}
 */
export function asyncReduce(iterable: any[], callback: Function, accumulator?: any): Promise<any>;
