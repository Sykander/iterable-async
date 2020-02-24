const { expect } = require('./support/chai'),
	{ getArray } = require('./support/data-factory'),
	{ getCallback } = require('./support/helpers'),
	{
		rejectsWithError,
		ranCallbacksInOrder,
		hasAccessToCorrectArgumentsOnCallback
	} = require('./support/spec-helpers'),
	{ providedThisArg } = require('./support/constants'),
	{ asyncMap } = require('../src');

context('Async Map', () => {
	let array;

	beforeEach(() => {
		array = getArray();
	});

	describe('Given no arguments', () => {
		it('Should reject with "TypeError: undefined is not iterable"', () =>
			rejectsWithError(
				asyncMap(),
				new TypeError('undefined is not iterable')
			));
	});

	describe('Given no callback', () => {
		it('Should reject with "TypeError: undefined is not a function"', () =>
			rejectsWithError(
				asyncMap(array),
				new TypeError('undefined is not a function')
			));
	});

	describe('Given a synchronous callback', () => {
		let result, callback, mappedArray;

		beforeEach(async () => {
			({ result, callback } = getCallback());

			mappedArray = await asyncMap(array, callback);
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
			({ result, callback } = getCallback({ isAsync: true }));

			mappedArray = await asyncMap(array, callback, array);
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
		let callback, error;

		beforeEach(
			() =>
				({
					callback,
					meta: { error }
				} = getCallback({ isError: true }))
		);

		it('Should reject with that error', async () =>
			rejectsWithError(asyncMap(array, callback), error));
	});

	describe('Given a callback that uses all arguments', () => {
		let result, callback;

		beforeEach(async () => {
			({ result, callback } = getCallback());

			await asyncMap(array, callback);
		});

		it('Should have access to currentValue, index and array on the callback', () =>
			hasAccessToCorrectArgumentsOnCallback(array, result, [
				'currentValue',
				'index',
				'array'
			]));
	});

	describe('Given the optional thisArg parameter', () => {
		let result, callback;

		beforeEach(async () => {
			({ result, callback } = getCallback());

			await asyncMap(array, callback, providedThisArg);
		});

		it('Should have accesss to thisArg on callback', () =>
			result.every(({ thisArg }) =>
				expect(thisArg.toString()).to.equal(providedThisArg.toString())
			));
	});
});
