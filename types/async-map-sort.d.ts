/**
 * Async Map Sort
 *
 * Map asynchronously, then sort asynchronously
 * (although you should use a synchronous function here if possible)
 * then resolve
 * alternatively reject at the first error
 * @async
 * @param {any[]} iterable
 * @param {Function} mappingFunction - mappingFunction(currentValue, index, array)
 * @param {Function} [comparisonFunction=compareByUnicode]
 * @return {Promise<any[]>}
 * @throws {TypeError}
 */
export function asyncMapSort(iterable: any[], mappingFunction: Function, comparisonFunction?: Function): Promise<any[]>;
