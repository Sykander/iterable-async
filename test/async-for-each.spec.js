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
	{ asyncForEach: asyncForEachFunction } = require('../src');

context('Async For Each', () => {
	let array, asyncForEach;

	beforeEach(() => {
		(array = getArray()), (asyncForEach = asyncForEachFunction.bind(array));
	});

	describe('Given no arguments', () => {
		it('Should reject with "TypeError: undefined is not a function"', () =>
			rejectsWithError(
				asyncForEach(),
				new TypeError('undefined is not a function')
			));
	});

	describe('Given a synchronous callback', () => {
		let result, callback;

		beforeEach(async () => {
			({ result, callback } = getSyncCallback());

			await asyncForEach(callback);
		});

		it('Should run each callback in order', () =>
			ranCallbacksInOrder(result));
	});

	describe('Given an asynchronous callback', () => {
		let result, callback;

		beforeEach(async () => {
			({ result, callback } = getAsyncCallback());

			await asyncForEach(callback);
		});

		it('Should run each callback in order', () =>
			ranCallbacksInOrder(result));
	});

	describe('Given a callback that throws an error', () => {
		let callback, error;

		beforeEach(
			() =>
				({
					callback,
					meta: { error }
				} = getErrorCallback())
		);

		it('Should reject with that error', async () =>
			rejectsWithError(asyncForEach(callback), error));
	});

	describe('Given a callback that uses additional parameters', () => {
		let result, callback;

		beforeEach(async () => {
			({ result, callback } = getSyncCallback());

			await asyncForEach(callback);
		});

		it('Should have access to currentValue, index and array on the callback', () =>
			hasAccessToCorrectArgumentsOnCallback(array, result));
	});

	describe('Given the optional thisArg parameter', () => {
		let result, callback, newArray;

		beforeEach(async () => {
			newArray = getArray();

			({ result, callback } = getSyncCallback());

			await asyncForEach(callback, newArray);
		});

		it('Should loop over the given thisArg', () => {
			return result.every(({ array }) =>
				expect(array).to.equal(newArray)
			);
		});
	});
});
