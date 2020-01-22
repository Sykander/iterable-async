declare module 'iterable-async' {
	class AsyncArray<T = any> extends Array {
		static from<T>(iterable: Iterable<T> | ArrayLike<T>): AsyncArray<T>;

		static from<T, U>(
			iterable: Iterable<T> | ArrayLike<T>,
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
	}

	// Due to the way this package is structured, the functions have to be defined twice.
	export function asyncFilter(
		callback: (
			currentValue: any,
			index?: number,
			array?: Array<any>
		) => void,
		thisArg?: ThisParameterType<AsyncArray> | Symbol
	): Promise<AsyncArray>;

	export function asyncFind(
		callback: (
			currentValue: any,
			index?: number,
			array?: Array<any>
		) => void,
		thisArg?: ThisParameterType<AsyncArray> | Symbol
	): Promise<any>;

	export function asyncFindIndex(
		callback: (
			currentValue: any,
			index?: number,
			array?: Array<any>
		) => void,
		thisArg?: ThisParameterType<AsyncArray> | Symbol
	): Promise<number>;

	export function asyncForEach(
		callback: (
			currentValue: any,
			index?: number,
			array?: Array<any>
		) => void,
		thisArg?: ThisParameterType<AsyncArray> | Symbol
	): Promise<void>;

	export function asyncMap(
		callback: (
			currentValue: any,
			index?: number,
			array?: Array<any>
		) => void,
		thisArg?: ThisParameterType<AsyncArray> | Symbol
	): Promise<AsyncArray>;

	export function asyncSort(
		compareFunc?: (leftItem: any, pivot: any) => any
	): Promise<AsyncArray>;
}
