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
	asyncFilterFunction = require('../src/async-filter');

context('Async Filter', () => {
	let array, asyncFilter;

	beforeEach(() => {
		(array = getArray()), (asyncFilter = asyncFilterFunction.bind(array));
	});

	describe('Given no arguments', () => {
		it('Should reject with "TypeError: undefined is not a function"', () =>
			rejectsWithError(
				asyncFilter(),
				new TypeError('undefined is not a function')
			));
	});

	describe('Given a synchronous callback', () => {
		let result, callback, filteredArray;

		beforeEach(async () => {
			({ result, callback } = getSyncCallback());

			filteredArray = await asyncFilter(callback);
		});

		it('Should run each callback in order', () =>
			ranCallbacksInOrder(result));

		it('Should filter each item based on callback result', () => {
			return array.every(item => {
				if (item) {
					return expect(filteredArray).to.contain(item);
				} else {
					return expect(filteredArray).to.not.contain(item);
				}
			});
		});

		it('Should resolve to a new array', async () =>
			expect(filteredArray).to.not.equal(array));
	});

	describe('Given an asynchronous callback', () => {
		let result, callback, filteredArray;

		beforeEach(async () => {
			({ result, callback } = getAsyncCallback());

			filteredArray = await asyncFilter(callback, array);
		});

		it('Should run each callback in order', () =>
			ranCallbacksInOrder(result));

		it('Should filter each item based on callback result', async () => {
			return array.every(item => {
				if (item) {
					return expect(filteredArray).to.contain(item);
				} else {
					return expect(filteredArray).to.not.contain(item);
				}
			});
		});

		it('Should resolve to a new array', async () =>
			expect(filteredArray).to.not.equal(array));
	});

	describe('Given a callback that throws an error', () => {
		let callback, error;

		beforeEach(() => ({ callback, error } = getErrorCallback()));

		it('Should reject with that error', async () =>
			rejectsWithError(asyncFilter(callback), error));
	});

	describe('Given a callback that uses additional parameters', () => {
		let result, callback;

		beforeEach(async () => {
			({ result, callback } = getSyncCallback());

			await asyncFilter(callback);
		});

		it('Should have access to currentValue, index and array on the callback', () =>
			hasAccessToCorrectArgumentsOnCallback(array, result));
	});

	describe('Given the optional thisArg parameter', () => {
		let result, callback, newArray;

		beforeEach(async () => {
			newArray = getArray();

			({ result, callback } = getSyncCallback());

			await asyncFilter(callback, newArray);
		});

		it('Should loop over the given thisArg', () => {
			return result.every(({ array }) =>
				expect(array).to.equal(newArray)
			);
		});
	});
});
