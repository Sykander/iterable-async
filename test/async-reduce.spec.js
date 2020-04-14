const { expect } = require('./support/chai'),
	{ getArray } = require('./support/data-factory'),
	{ getCallback } = require('./support/helpers'),
	{
		rejectsWithError,
		ranCallbacksInOrder,
		hasAccessToCorrectArgumentsOnCallback
	} = require('./support/spec-helpers'),
	{ asyncReduce } = require('../src');

context('Async Reduce', () => {
	let array;

	beforeEach(() => {
		array = getArray();
	});

	describe('Given no arguments', () => {
		it('Should reject with "TypeError: undefined is not iterable"', () =>
			rejectsWithError(
				asyncReduce(),
				new TypeError('undefined is not iterable')
			));
	});

	describe('Given no callback', () => {
		it('Should reject with "TypeError: undefined is not a function"', () =>
			rejectsWithError(
				asyncReduce(array),
				new TypeError('undefined is not a function')
			));
	});

	describe('Given an empty array, a callback and no accumulator', () => {
		it('Should reject with "TypeError: asyncReduce of empty array with no accumulator given', () =>
			rejectsWithError(
				asyncReduce([], () => 1),
				new TypeError(
					'asyncReduce of empty array with no accumulator given'
				)
			));
	});

	describe('Given a synchronous callback', () => {
		let result, callback, reducedAccumulator;

		beforeEach(async () => {
			({ result, callback } = getCallback({
				isReduce: true
			}));

			reducedAccumulator = await asyncReduce(array, callback);
		});

		it('Should run each callback in order', () => {
			ranCallbacksInOrder(result);

			expect(result.length).to.be.greaterThan(
				0,
				'No callbacks were run.'
			);
		});

		it('Should reduce each item in order', async () => {
			array.every((element, index) => {
				return expect(reducedAccumulator[index]).to.equal(element);
			});
		});

		it('Should resolve to the completed value accumulator', async () => {
			result.every(({ item }, index) => {
				return expect(reducedAccumulator[index]).to.equal(item);
			});

			expect(result.length).to.be.greaterThan(
				0,
				'No callbacks were run.'
			);
		});
	});

	describe('Given an asynchronous callback', () => {
		let result, callback, reducedAccumulator;

		beforeEach(async () => {
			({ result, callback } = getCallback({
				isAsync: true,
				isReduce: true
			}));

			reducedAccumulator = await asyncReduce(array, callback);
		});

		it('Should run each callback in order', () => {
			ranCallbacksInOrder(result);

			expect(result.length).to.be.greaterThan(
				0,
				'No callbacks were run.'
			);
		});

		it('Should reduce each item in order', async () => {
			array.every((element, index) => {
				return expect(reducedAccumulator[index]).to.equal(element);
			});
		});

		it('Should resolve to the completed value accumulator', async () => {
			result.every(({ item }, index) => {
				return expect(reducedAccumulator[index]).to.equal(item);
			});

			expect(result.length).to.be.greaterThan(
				0,
				'No callbacks were run.'
			);
		});
	});

	describe('Given a callback that throws an error', () => {
		let callback, error;

		beforeEach(
			() =>
				({
					callback,
					meta: { error }
				} = getCallback({ isReduce: true, isError: true }))
		);

		it('Should reject with that error', async () =>
			rejectsWithError(asyncReduce(array, callback), error));
	});

	describe('Given a callback that uses all arguments', () => {
		let result, callback;

		beforeEach(async () => {
			({ result, callback } = getCallback({
				isReduce: true
			}));

			await asyncReduce(array, callback);
		});

		it('Should have access to accumulator, currentValue, index and array on the callback', () => {
			hasAccessToCorrectArgumentsOnCallback(
				array,
				result,
				['accumulator', 'currentValue', 'index', 'array'],
				{ skipFirst: true }
			);

			expect(result.length).to.be.greaterThan(
				0,
				'No callbacks were run.'
			);
		});
	});

	describe('Given the optional accumulator parameter', () => {
		let result, callback, accumulator;

		beforeEach(async () => {
			({ result, callback } = getCallback()), (accumulator = {});

			await asyncReduce(array, callback, accumulator);
		});

		it('Should have accesss to accumulator on all callback iterations', () => {
			expect(
				result.every(
					({ accumulator: resultAccumulator }) =>
						resultAccumulator === accumulator
				)
			).to.be.true;

			expect(result.length).to.be.greaterThan(
				0,
				'No callbacks were run.'
			);
		});
	});
});
