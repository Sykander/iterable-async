const { expect } = require('./support/chai'),
	{ getArray } = require('./support/data-factory'),
	{ getCallback } = require('./support/helpers'),
	{
		rejectsWithError,
		ranCallbacksInOrder,
		hasAccessToCorrectArgumentsOnCallback
	} = require('./support/spec-helpers'),
	{ asyncMapSort } = require('../src');

context('Async Map Sort', () => {
	let array;

	beforeEach(() => {
		array = getArray();
	});

	describe('Given no arguments', () => {
		it('Should reject with "TypeError: undefined is not iterable"', () =>
			rejectsWithError(
				asyncMapSort(),
				new TypeError('undefined is not iterable')
			));
	});

	describe('Given no mappingFunction', () => {
		it('Should reject with "TypeError: undefined is not a function"', () =>
			rejectsWithError(
				asyncMapSort(array),
				new TypeError('undefined is not a function')
			));
	});

	describe('Given no comparisonFunction', () => {
		// It should map and then sort by unicode
	});

	describe('Given a synchronous mappingFunction', () => {
		let result, mappingFunction, mapSortedArray;

		beforeEach(async () => {
			({ result, callback: mappingFunction } = getCallback());

			mapSortedArray = await asyncMapSort(array, mappingFunction);
		});

		it('Should run each mappingFunction in order', () =>
			ranCallbacksInOrder(result));

		it('Should map each item in order', async () => {
			mapSortedArray.every((item, index) =>
				expect(item).to.equal(array[index])
			);
		});

		it('Should resolve to a new array', async () => {
			expect(mapSortedArray).to.not.equal(array);
		});

		it('Should sort by unicode after mapping', async () => {
			// should sort by unicode
		});
	});

	describe('Given an asynchronous mappingFunction', () => {
		let result, mappingFunction, mapSortedArray;

		beforeEach(async () => {
			({ result, callback: mappingFunction } = getCallback({
				isAsync: true
			}));

			mapSortedArray = await asyncMapSort(array, mappingFunction);
		});

		it('Should run each mappingFunction in order', () =>
			ranCallbacksInOrder(result));

		it('Should map each item in order', async () => {
			mapSortedArray.every((item, index) =>
				expect(item).to.equal(array[index])
			);
		});

		it('Should resolve to a new array', async () => {
			expect(mapSortedArray).to.not.equal(array);
		});

		it('Should sort by unicode after mapping', async () => {
			// should sort by unicode
		});
	});

	describe('Given a mappingFunction that throws an error', () => {
		let mappingFunction, error;

		beforeEach(
			() =>
				({
					callback: mappingFunction,
					meta: { error }
				} = getCallback({ isError: true }))
		);

		it('Should reject with that error', async () =>
			rejectsWithError(asyncMapSort(array, mappingFunction), error));
	});

	describe('Given a mappingFunction that uses all arguments', () => {
		let result, mappingFunction;

		beforeEach(async () => {
			({ result, callback: mappingFunction } = getCallback());

			await asyncMapSort(array, mappingFunction);
		});

		it('Should have access to currentValue, index and array on the mappingFunction', () =>
			hasAccessToCorrectArgumentsOnCallback(array, result, [
				'currentValue',
				'index',
				'array'
			]));
	});

	describe('Given the optional comparisonFunction parameter', () => {
		let result, mappingFunction, mapSortedArray, comparisonFunction;

		beforeEach(async () => {
			({ callback: mappingFunction } = getCallback());
			({ result, callback: comparisonFunction } = getCallback({
				isSort: true
			}));

			mapSortedArray = await asyncMapSort(
				array,
				mappingFunction,
				comparisonFunction
			);
		});

		it('Should sort by the given comparisonFunction after mapping', async () => {
			expect(mapSortedArray);
			expect(result);
			// returned array should have correct ordering given the comparison
		});
	});
});
