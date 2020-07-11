/**
 * Async Array
 * ===========
 * Array like object with access to async array methods
 * @class AsyncArray
 * @extends Array
 */
export class AsyncArray extends Array<any> {
    static asyncFilter(iterable: any, callback: any, thisArg?: any): any[];
    static asyncFind(iterable: any, callback: any, thisArg?: any): any;
    static asyncFindIndex(iterable: any, callback: any, thisArg?: any): number;
    static asyncForEach(iterable: any, callback: any, thisArg?: any): Promise<void>;
    static asyncMap(iterable: any, callback: any, thisArg?: any): any[];
    static asyncMapSort(iterable: any, mappingCallback: any, comparisonCallback?: (a: any, b: any) => number): any[];
    static asyncReduce(iterable: any, callback: any, accumulator?: any): any;
    static asyncSort(iterable: any, callback?: (a: any, b: any) => number): any;
    constructor(arrayLength?: number);
    constructor(arrayLength: number);
    constructor(...items: any[]);
    asyncFilter(callback: any, thisArg?: any): any[];
    asyncFind(callback: any, thisArg?: any): any;
    asyncFindIndex(callback: any, thisArg?: any): number;
    asyncForEach(callback: any, thisArg?: any): Promise<void>;
    asyncMap(callback: any, thisArg?: any): any[];
    asyncMapSort(mappingCallback: any, comparisonCallback?: (a: any, b: any) => number): any[];
    asyncReduce(callback: any, accumulator?: any): any;
    asyncSort(callback?: (a: any, b: any) => number): any;
}
