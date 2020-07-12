export = AsyncArray;
/**
 * Async Array
 * ===========
 * Array like object with access to async array methods
 * @class
 * @extends Array
 */
declare class AsyncArray extends Array<any> {
    /**
     * @async
     * @param {any[]} iterable
     * @param {Function} callback
     * @param {any} [thisArg=undefined]
     * @return {Promise<any[]>}
     * @throws {TypeError}
     */
    static asyncFilter(iterable: any[], callback: Function, thisArg?: any): Promise<any[]>;
    /**
     * @async
     * @param {any[]} iterable
     * @param {Function} callback
     * @param {any} [thisArg=undefined]
     * @return {Promise<any>}
     * @throws {TypeError}
     */
    static asyncFind(iterable: any[], callback: Function, thisArg?: any): Promise<any>;
    /**
     * @async
     * @param {any[]} iterable
     * @param {Function} callback
     * @param {any} [thisArg=undefined]
     * @return {Promise<Number>}
     * @throws {TypeError}
     */
    static asyncFindIndex(iterable: any[], callback: Function, thisArg?: any): Promise<number>;
    /**
     * @async
     * @param {any[]} iterable
     * @param {Function} callback
     * @param {any} [thisArg=undefined]
     * @throws {TypeError}
     */
    static asyncForEach(iterable: any[], callback: Function, thisArg?: any): Promise<void>;
    /**
     * @async
     * @param {any[]} iterable
     * @param {Function} callback
     * @param {any} [thisArg=undefined]
     * @return {Promise<any[]>}
     * @throws {TypeError}
     */
    static asyncMap(iterable: any[], callback: Function, thisArg?: any): Promise<any[]>;
    /**
     * @async
     * @param {any[]} iterable
     * @param {Function} mappingCallback
     * @param {Function} [comparisonCallback=compareByUnicode]
     * @return {Promise<any[]>}
     * @throws {TypeError}
     */
    static asyncMapSort(iterable: any[], mappingCallback: Function, comparisonCallback?: Function): Promise<any[]>;
    /**
     * @async
     * @param {any[]} iterable
     * @param {Function} callback
     * @param {any} [accumulator=noParam]
     * @return {Promise<any>}
     * @throws {TypeError}
     */
    static asyncReduce(iterable: any[], callback: Function, accumulator?: any): Promise<any>;
    /**
     * @async
     * @param {any[]} iterable
     * @param {Function} [callback=compareByUnicode]
     * @return {Promise<any[]>}
     * @throws {TypeError}
     */
    static asyncSort(iterable: any[], callback?: Function): Promise<any[]>;
    constructor(arrayLength?: number);
    constructor(arrayLength: number);
    constructor(...items: any[]);
    /**
     * @async
     * @param {Function} callback
     * @param {any} [thisArg=undefined]
     * @return {Promise<any[]>}
     * @throws {TypeError}
     */
    asyncFilter(callback: Function, thisArg?: any): Promise<any[]>;
    /**
     * @async
     * @param {Function} callback
     * @param {any} [thisArg=undefined]
     * @return {Promise<any>}
     * @throws {TypeError}
     */
    asyncFind(callback: Function, thisArg?: any): Promise<any>;
    /**
     * @async
     * @param {Function} callback
     * @param {any} [thisArg=undefined]
     * @return {Promise<Number>}
     * @throws {TypeError}
     */
    asyncFindIndex(callback: Function, thisArg?: any): Promise<number>;
    /**
     * @async
     * @param {Function} callback
     * @param {any} [thisArg=undefined]
     * @throws {TypeError}
     */
    asyncForEach(callback: Function, thisArg?: any): Promise<void>;
    /**
     * @async
     * @param {Function} callback
     * @param {any} [thisArg=undefined]
     * @return {Promise<any[]>}
     * @throws {TypeError}
     */
    asyncMap(callback: Function, thisArg?: any): Promise<any[]>;
    /**
     * @async
     * @param {Function} mappingCallback
     * @param {Function} [comparisonCallback=compareByUnicode]
     * @return {Promise<any[]>}
     * @throws {TypeError}
     */
    asyncMapSort(mappingCallback: Function, comparisonCallback?: Function): Promise<any[]>;
    /**
     * @async
     * @param {Function} callback
     * @param {any} [accumulator=noParam]
     * @return {Promise<any>}
     * @throws {TypeError}
     */
    asyncReduce(callback: Function, accumulator?: any): Promise<any>;
    /**
     * @async
     * @param {Function} [callback=compareByUnicode]
     * @return {Promise<this>}
     * @throws {TypeError}
     */
    asyncSort(callback?: Function): Promise<this>;
}
