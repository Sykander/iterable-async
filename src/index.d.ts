// Type definitions for iterable-async 1.0.4
// Project: iterable-async
// Definitions by: Sykander Gul <scanda@live.co.uk>

export default class AsyncArray<T = any> extends Array {
	static from<T>(iterable: ArrayLike<T>): AsyncArray<T>;

	static from<T, U>(
		iterable: ArrayLike<T>,
		mapfn: (v: T, k: number) => U,
		thisArg?: any
	): AsyncArray<U>;

	asyncFilter(
		callback: (
			currentValue: any,
			index?: number,
			array?: Array<any>
		) => void,
		thisArg?: ThisParameterType<AsyncArray> | Symbol
	): Promise<AsyncArray>;

	asyncFind(
		callback: (
			currentValue: any,
			index?: number,
			array?: Array<any>
		) => void,
		thisArg?: ThisParameterType<AsyncArray> | Symbol
	): Promise<any>;

	asyncFindIndex(
		callback: (
			currentValue: any,
			index?: number,
			array?: Array<any>
		) => void,
		thisArg?: ThisParameterType<AsyncArray> | Symbol
	): Promise<number>;

	asyncForEach(
		callback: (
			currentValue: any,
			index?: number,
			array?: Array<any>
		) => void,
		thisArg?: ThisParameterType<AsyncArray> | Symbol
	): Promise<void>;

	asyncMap(
		callback: (
			currentValue: any,
			index?: number,
			array?: Array<any>
		) => void,
		thisArg?: ThisParameterType<AsyncArray> | Symbol
	): Promise<AsyncArray>;

	asyncSort(
		compareFunc?: (leftItem: any, pivot: any) => any
	): Promise<AsyncArray>;

	static asyncFilter<T>(
		iterable: ArrayLike<T>,
		callback: (
			currentValue: any,
			index?: number,
			array?: Array<any>
		) => void,
		thisArg?: ThisParameterType<AsyncArray> | Symbol
	): Promise<Array<T>>;

	static asyncFind<T>(
		iterable: ArrayLike<T>,
		callback: (
			currentValue: any,
			index?: number,
			array?: Array<any>
		) => void,
		thisArg?: ThisParameterType<AsyncArray> | Symbol
	): Promise<any>;

	static asyncFindIndex<T>(
		iterable: ArrayLike<T>,
		callback: (
			currentValue: any,
			index?: number,
			array?: Array<any>
		) => void,
		thisArg?: ThisParameterType<AsyncArray> | Symbol
	): Promise<number>;

	static asyncForEach<T>(
		iterable: ArrayLike<T>,
		callback: (
			currentValue: any,
			index?: number,
			array?: Array<any>
		) => void,
		thisArg?: ThisParameterType<AsyncArray> | Symbol
	): Promise<void>;

	static asyncMap<T>(
		iterable: ArrayLike<T>,
		callback: (
			currentValue: any,
			index?: number,
			array?: Array<any>
		) => void,
		thisArg?: ThisParameterType<AsyncArray> | Symbol
	): Promise<Array<T>>;

	static asyncSort<T>(
		iterable: ArrayLike<T>,
		compareFunc?: (leftItem: any, pivot: any) => any
	): Promise<Array<T>>;
}
