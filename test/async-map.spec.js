const { expect } = require('./support/chai'),
	{ getArray } = require('./support/data-factory'),
	{
		getSyncCallback,
		getAsyncCallback,
		getErrorCallback
	} = require('./support/helpers'),
	{
		rejectsWithError,
		ranCallbacksInOrder,
		hasAccessToCorrectArgumentsOnCallback
	} = require('./support/spec-helpers'),
	asyncMapFunction = require('../src/async-map');

context('Async Map', () => {
	let array, asyncMap;

	beforeEach(() => {
		(array = getArray()), (asyncMap = asyncMapFunction.bind(array));
	});

	describe('Given no arguments', () => {
		it('Should reject with "TypeError: undefined is not a function"', () =>
			rejectsWithError(
				asyncMap(),
				new TypeError('undefined is not a function')
			));
	});

	describe('Given a synchronous callback', () => {
		let result, callback, mappedArray;

		beforeEach(async () => {
			({ result, callback } = getSyncCallback());

			mappedArray = await asyncMap(callback);
		});

		it('Should run each callback in order', () =>
			ranCallbacksInOrder(result));

		it('Should map each item in order', async () => {
			mappedArray.every((item, index) =>
				expect(item).to.equal(array[index])
			);
		});

		it('Should resolve to a new array', async () => {
			expect(mappedArray).to.not.equal(array);
		});
	});

	describe('Given an asynchronous callback', () => {
		let result, callback, mappedArray;

		beforeEach(async () => {
			({ result, callback } = getAsyncCallback());

			mappedArray = await asyncMap(callback, array);
		});

		it('Should run each callback in order', () =>
			ranCallbacksInOrder(result));

		it('Should map each item in order', async () => {
			mappedArray.every((item, index) =>
				expect(item).to.equal(array[index])
			);
		});

		it('Should resolve to a new array', async () => {
			expect(mappedArray).to.not.equal(array);
		});
	});

	describe('Given a callback that throws an error', () => {
		let callback, string;

		beforeEach(() => ({ callback, string } = getErrorCallback()));

		it('Should reject with that error', async () => {
			await expect(asyncMap(callback)).to.rejectedWith(string);
		});
	});

	describe('Given a callback that uses additional parameters', () => {
		let result, callback;

		beforeEach(async () => {
			({ result, callback } = getSyncCallback());

			await asyncMap(callback);
		});

		it('Should have access to currentValue, index and array on the callback', () =>
			hasAccessToCorrectArgumentsOnCallback(array, result));
	});

	describe('Given the optional thisArg parameter', () => {
		let result, callback, newArray;

		beforeEach(async () => {
			newArray = getArray();

			({ result, callback } = getSyncCallback());

			await asyncMap(callback, newArray);
		});

		it('Should loop over the given thisArg', () => {
			return result.every(({ array }) =>
				expect(array).to.equal(newArray)
			);
		});
	});
});
