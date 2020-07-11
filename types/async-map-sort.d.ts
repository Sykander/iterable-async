/**
 * Async Map Sort
 * ==============
 * Map asynchronously, then sort asynchronously, then resolve
 * alternatively reject at the first error
 * @async
 * @param {Object} iterable
 * @param {Function} mappingFunction - mappingFunction(currentValue, index, array)
 * @param {Function} [comparisonFunction=compareByUnicode]
 * @return {Array}
 * @throws {TypeError}
 */
export function asyncMapSort(iterable: any, mappingFunction: Function, comparisonFunction?: Function): any[];
