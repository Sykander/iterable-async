const { expect } = require('./support/chai'),
	{ getArray } = require('./support/data-factory'),
	{
		getSyncCallback,
		getAsyncCallback,
		getErrorCallback
	} = require('./support/helpers'),
	{
		ranCallbacksInOrder,
		hasAccessToCorrectArgumentsOnCallback
	} = require('./support/spec-helpers'),
	{ asyncSort: asyncSortFunction } = require('../src');

context('Async Sort', () => {
	let array, asyncSort;

	beforeEach(() => {
		(array = getArray()), (asyncSort = asyncSortFunction.bind(array));
	});

	describe('Given no arguments', () => {
		// let sortedArray;
		// beforeEach(async () => {
		// 	sortedArray = await asyncSort();
		// });
		// // FIXME: Finish writing async sort spec from here
		// it('Should sort elements by unicode value', () => expect(sortedArray));
	});

	describe('Given a synchronous callback', () => {
		let result, callback, sortedArray;

		beforeEach(async () => {
			({ result, callback } = getSyncCallback());

			sortedArray = await asyncSort(callback);
		});

		it('Should run each callback in order', () =>
			ranCallbacksInOrder(result));

		it('Should map each item in order', async () => {
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
			({ result, callback } = getAsyncCallback());

			sortedArray = await asyncSort(callback, array);
		});

		it('Should run each callback in order', () =>
			ranCallbacksInOrder(result));

		it('Should map each item in order', async () => {
			sortedArray.every((item, index) =>
				expect(item).to.equal(array[index])
			);
		});

		it('Should resolve to the same array', async () =>
			expect(sortedArray).to.equal(array));
	});

	describe('Given a callback that throws an error', () => {
		let callback, string;

		beforeEach(() => ({ callback, string } = getErrorCallback()));

		it('Should reject with that error', async () => {
			await expect(asyncSort(callback)).to.rejectedWith(string);
		});
	});

	describe('Given a callback that uses additional parameters', () => {
		let result, callback;

		beforeEach(async () => {
			({ result, callback } = getSyncCallback());

			await asyncSort(callback);
		});

		it('Should have access to currentValue, index and array on the callback', () =>
			hasAccessToCorrectArgumentsOnCallback(array, result));
	});

	describe('Given the optional thisArg parameter', () => {
		let result, callback, newArray;

		beforeEach(async () => {
			newArray = getArray();

			({ result, callback } = getSyncCallback());

			await asyncSort(callback, newArray);
		});

		it('Should loop over the given thisArg', () => {
			return result.every(({ array }) =>
				expect(array).to.equal(newArray)
			);
		});
	});
});
