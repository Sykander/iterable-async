const { getArray } = require('./support/data-factory'),
	{ getCallback } = require('./support/helpers'),
	{
		rejectsWithError,
		ranCallbacksInOrder,
		hasAccessToCorrectArgumentsOnCallback
	} = require('./support/spec-helpers'),
	{ asyncReduce: asyncReduceFunction } = require('../src');

context('Async Reduce', () => {
	let array, asyncReduce;

	beforeEach(() => {
		(array = getArray()), (asyncReduce = asyncReduceFunction.bind(array));
	});

	describe('Given no arguments', () => {
		it('Should reject with "TypeError: undefined is not a function"', () =>
			rejectsWithError(
				asyncReduce(),
				new TypeError('undefined is not a function')
			));
	});

	describe('Given a synchronous callback', () => {
		// eslint-disable-next-line no-unused-vars
		let result, callback, reducedAccumulator;

		beforeEach(async () => {
			({ result, callback } = getCallback({
				isReduce: true
			}));

			reducedAccumulator = await asyncReduce(callback);
		});

		it('Should run each callback in order', () =>
			ranCallbacksInOrder(result));

		it('Should reduce each item in order', async () => 'pending');

		it('Should resolve to the completed value accumulator', async () =>
			'pending');
	});

	describe('Given an asynchronous callback', () => {
		// eslint-disable-next-line no-unused-vars
		let result, callback, reducedAccumulator;

		beforeEach(async () => {
			({ result, callback } = getCallback({
				isAsync: true,
				isReduce: true
			}));

			reducedAccumulator = await asyncReduce(callback, array);
		});

		it('Should run each callback in order', () =>
			ranCallbacksInOrder(result));

		it('Should reduce each item in order', async () => 'pending');

		it('Should resolve to the completed value accumulator', async () =>
			'pending');
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
			rejectsWithError(asyncReduce(callback), error));
	});

	describe('Given a callback that uses all arguments', () => {
		let result, callback;

		beforeEach(async () => {
			({ result, callback } = getCallback());

			await asyncReduce(callback);
		});

		it('Should have access to currentValue, index and array on the callback', () =>
			hasAccessToCorrectArgumentsOnCallback(array, result));
	});

	describe('Given the optional accumulator parameter', () => {
		// eslint-disable-next-line no-unused-vars
		let result, callback, accumulator;

		beforeEach(async () => {
			({ result, callback } = getCallback()), (accumulator = {});

			await asyncReduce(callback, accumulator);
		});

		it('Should have accesss to accumulator on all callback iterations', () =>
			'pending');
	});
});
