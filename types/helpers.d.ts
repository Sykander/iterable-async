/**
 * Map Iterable
 * ==============
 * Allows any iterable object to be mapped with correct callback parameters
 * eg. callback(currentValue, index, sourceIterable)
 * @ignore
 * @param {any[]} iterable
 * @param {Function} callback
 * @param {Object} [options]
 * @param {Boolean} [options.useEmptyElements=true] - use empty elements of the array ?
 * @return {any[]}
 */
export function mapIterable(iterable: any[], callback: Function, { useEmptyElements }?: {
    useEmptyElements: boolean;
}): any[];
/**
 * Filter Iterable
 * ===============
 * Allows any iterable object to be filtered using an array as a check list
 * @ignore
 * @param {any[]} iterable
 * @param {any[]} checks
 * @return {any[]}
 */
export function filterIterable(iterable: any[], checks: any[]): any[];
/**
 * Swap items in array
 * @ignore
 * @param {any[]} items
 * @param {Number} leftIndex
 * @param {Number} rightIndex
 */
export function swapItems(items: any[], leftIndex: number, rightIndex: number): void;
/**
 * Async partition an array for quick sort
 * @ignore
 * @async
 * @param {any[]} items
 * @param {Number} leftIndex
 * @param {Number} rightIndex
 * @param {Function} compare
 * @return {Promise<Number>} leftIndex after partition
 */
export function asyncPartition(items: any[], leftIndex: number, rightIndex: number, compare: Function): Promise<number>;
/**
 * Compares two items by unicode
 * @ignore
 * @param {any} a
 * @param {any} b
 * @return {Number} -1, 0, 1
 */
export function compareByUnicode(a: any, b: any): number;
