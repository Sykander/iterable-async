/**
 * Async Reduce
 * ============
 * Reduce asynchronously and resolve when
 * all items have been transduced.
 * @async
 * @param {Object} iterable
 * @param {Function} callback - callback(currentValue, index, array)
 * @param {any} [accumulator=noParam]
 * @return {any}
 * @throws {TypeError}
 */
export function asyncReduce(iterable: any, transducer: any, accumulator?: any): any;
