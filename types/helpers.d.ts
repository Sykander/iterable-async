/**
 * Map Iterable
 * ==============
 * Allows any iterable object to be mapped with correct callback parameters
 * eg. callback(currentValue, index, sourceIterable)
 * @param {Object} iterable
 * @param {Function} callback
 * @param {Object} [options]
 * @param {Boolean} [options.useEmptyElements=true] - use empty elements of the array ?
 * @return {Array}
 */
export function mapIterable(iterable: any, callback: Function, { useEmptyElements }?: {
    useEmptyElements: boolean;
}): any[];
/**
 * Filter Iterable
 * ===============
 * Allows any iterable object to be filtered using an array as a check list
 * @param {Object} iterable
 * @param {Array} checks
 * @return {Array}
 */
export function filterIterable(iterable: any, checks: any[]): any[];
/**
 * Swap items in array
 * @param {Object} items
 * @param {Number} leftIndex
 * @param {Number} rightIndex
 */
export function swapItems(items: any, leftIndex: number, rightIndex: number): void;
/**
 * Async partition an array for quick sort
 * @async
 * @param {Object} items
 * @param {Number} leftIndex
 * @param {Number} rightIndex
 * @param {Function} compare
 * @return {Number} leftIndex after partition
 */
export function asyncPartition(items: any, leftIndex: number, rightIndex: number, compare: Function): number;
/**
 * Compares two items by unicode
 * @param {any} a
 * @param {any} b
 * @return {Number} -1, 0, 1
 */
export function compareByUnicode(a: any, b: any): number;
