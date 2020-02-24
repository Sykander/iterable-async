const { expect } = require('./support/chai'),
	{ getArray } = require('./support/data-factory'),
	{ getCallback } = require('./support/helpers'),
	{
		rejectsWithError,
		ranCallbacksInOrder,
		hasAccessToCorrectArgumentsOnCallback
	} = require('./support/spec-helpers'),
	{ providedThisArg } = require('./support/constants'),
	{ asyncFilter } = require('../src');

context('Async Filter', () => {
	let array;

	beforeEach(() => {
		array = getArray();
	});

	describe('Given no arguments', () => {
		it('Should reject with "TypeError: undefined is not iterable"', () =>
			rejectsWithError(
				asyncFilter(),
				new TypeError('undefined is not iterable')
			));
	});

	describe('Given no callback', () => {
		it('Should reject with "TypeError: undefined is not a function"', () =>
			rejectsWithError(
				asyncFilter(array),
				new TypeError('undefined is not a function')
			));
	});

	describe('Given a synchronous callback', () => {
		let result, callback, filteredArray;

		beforeEach(async () => {
			({ result, callback } = getCallback());

			filteredArray = await asyncFilter(array, callback);
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
			({ result, callback } = getCallback({ isAsync: true }));

			filteredArray = await asyncFilter(array, callback);
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

		beforeEach(
			() =>
				({
					callback,
					meta: { error }
				} = getCallback({ isError: true }))
		);

		it('Should reject with that error', async () =>
			rejectsWithError(asyncFilter(array, callback), error));
	});

	describe('Given a callback that uses all arguments', () => {
		let result, callback;

		beforeEach(async () => {
			({ result, callback } = getCallback());

			await asyncFilter(array, callback);
		});

		it('Should have access to currentValue, index and array on the callback', () =>
			hasAccessToCorrectArgumentsOnCallback(array, result));
	});

	describe('Given the optional thisArg parameter', () => {
		let result, callback;

		beforeEach(async () => {
			({ result, callback } = getCallback());

			await asyncFilter(array, callback, providedThisArg);
		});

		it('Should have accesss to thisArg on callback', () =>
			result.every(({ thisArg }) =>
				expect(thisArg.toString()).to.equal(providedThisArg.toString())
			));
	});
});
