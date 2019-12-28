const { expect } = require('./support/chai'),
	{ getArray } = require('./support/data-factory'),
	{ getCallback } = require('./support/helpers'),
	{
		rejectsWithError,
		ranCallbacksInOrder,
		hasAccessToCorrectArgumentsOnCallback
	} = require('./support/spec-helpers'),
	{ providedThisArg } = require('./support/constants'),
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
			({ result, callback } = getCallback());

			await asyncForEach(callback);
		});

		it('Should run each callback in order', () =>
			ranCallbacksInOrder(result));
	});

	describe('Given an asynchronous callback', () => {
		let result, callback;

		beforeEach(async () => {
			({ result, callback } = getCallback({ isAsync: true }));

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
				} = getCallback({ isError: true }))
		);

		it('Should reject with that error', async () =>
			rejectsWithError(asyncForEach(callback), error));
	});

	describe('Given a callback that uses all arguments', () => {
		let result, callback;

		beforeEach(async () => {
			({ result, callback } = getCallback());

			await asyncForEach(callback);
		});

		it('Should have access to currentValue, index and array on the callback', () =>
			hasAccessToCorrectArgumentsOnCallback(array, result));
	});

	describe('Given the optional thisArg parameter', () => {
		let result, callback;

		beforeEach(async () => {
			({ result, callback } = getCallback());

			await asyncForEach(callback, providedThisArg);
		});

		it('Should have accesss to thisArg on callback', () =>
			result.every(({ thisArg }) =>
				expect(thisArg.toString()).to.equal(providedThisArg.toString())
			));
	});
});
