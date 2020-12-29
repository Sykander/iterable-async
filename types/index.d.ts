export const asyncFind: (iterable: any[], callback: Function, thisArg?: any) => Promise<any>;
export const asyncFindIndex: (iterable: any[], callback: Function, thisArg?: any) => Promise<number>;
export const asyncFilter: (iterable: any[], callback: Function, thisArg?: any) => Promise<any[]>;
export const asyncForEach: (iterable: any[], callback: Function, thisArg?: any) => Promise<void>;
export const asyncMap: (iterable: any[], callback: Function, thisArg?: any) => Promise<any[]>;
export const asyncMapSort: (iterable: any[], mappingFunction: Function, comparisonFunction?: Function) => Promise<any[]>;
export const asyncReduce: (iterable: any[], callback: Function, accumulator?: any) => Promise<any>;
export const asyncSort: (iterable: any[], compare?: Function) => Promise<any[]>;
