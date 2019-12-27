const { expect } = require('./support/chai'),
	{ getArray } = require('./support/data-factory'),
	{ getCallback } = require('./support/helpers'),
	{
		ranCallbacksInOrder,
		rejectsWithError
	} = require('./support/spec-helpers'),
	{ asyncSort: asyncSortFunction } = require('../src');

context('Async Sort', () => {
	let array, asyncSort;

	beforeEach(() => {
		(array = getArray()), (asyncSort = asyncSortFunction.bind(array));
	});

	describe('Given no arguments', () => {
		let sortedArray;

		beforeEach(async () => {
			sortedArray = await asyncSort();
		});

		it('Should sort elements by unicode value', () => {
			const expectedResult = array.slice().sort();

			expectedResult.every((item, index) =>
				expect(item).to.equal(sortedArray[index])
			);
		});
	});

	describe('Given a synchronous callback', () => {
		let result, callback, sortedArray;

		beforeEach(async () => {
			({ result, callback } = getCallback({ isSort: true }));

			sortedArray = await asyncSort(callback);
		});

		it('Should run each callback in order', () =>
			ranCallbacksInOrder(result));

		it('Should sort each item by the callback result', async () => {
			sortedArray.every((item, index) =>
				expect(item).to.equal(array[index])
			);
		});

		it('Should resolve to the same array', async () =>
			expect(sortedArray).to.equal(array));
	});

	describe('Given an asynchronous callback', () => {
		let result, callback, sortedArray;

		beforeEach(async () => {
			({ result, callback } = getCallback({ isSort: true }));

			sortedArray = await asyncSort(callback, array);
		});

		it('Should run each callback in order', () =>
			ranCallbacksInOrder(result));

		it('Should sort each item by the callback result', async () => {
			sortedArray.every((item, index) =>
				expect(item).to.equal(array[index])
			);
		});

		it('Should resolve to the same array', async () =>
			expect(sortedArray).to.equal(array));
	});

	describe('Given a callback that throws an error', () => {
		let callback, error;

		beforeEach(
			() =>
				({
					callback,
					meta: { error }
				} = getCallback({ isSort: true }))
		);

		it('Should reject with that error', async () =>
			rejectsWithError(asyncSort(callback), error));
	});

	describe('Given a callback that uses all arguments', () => {
		let callback, result;

		beforeEach(async () => {
			({ result, callback } = getCallback({ isSort: true }));

			await asyncSort(callback);
		});

		it('Should have access to first and second elements', () =>
			result.every(({ firstEl, secondEl }) =>
				expect(array)
					.to.contain(firstEl)
					.and.contain(secondEl)
			));
	});

	describe('Given the optional thisArg parameter', () => {
		let result, callback, newArray;

		beforeEach(async () => {
			newArray = getArray();

			({ result, callback } = getCallback({ isSort: true }));

			await asyncSort(callback, newArray);
		});

		it('Should loop over the given thisArg', () => {
			return result.every(({ array }) =>
				expect(array).to.equal(newArray)
			);
		});
	});
});
