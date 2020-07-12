/**
 * Async Quick Sort
 * ================
 * Asynchronously sorts an iterable using quick-sort algorithm
 * @param {any[]} iterable
 * @param {Number} leftIndex
 * @param {Number} rightIndex
 * @param {Function} compareFunc
 */
export function asyncQuickSort(iterable: any[], leftIndex: number, rightIndex: number, compareFunc: Function): Promise<any[]>;
