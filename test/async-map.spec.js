const { expect } = require('./support/chai'),
	{ getArray, getString } = require('./support/helpers'),
	asyncMapFunction = require('../src/async-map');

context('Async Map', function() {
	let array, asyncMap;

	beforeEach(() => {
		(array = getArray()), (asyncMap = asyncMapFunction.bind(array));
	});

	describe('Given no arguments', function() {
		it('Should reject with "TypeError: undefined is not a function"', async function() {
			await expect(asyncMap()).to.rejectedWith(
				'undefined is not a function'
			);
		});
	});

	describe('Given a sychronous callback', function() {
		let result, callback;

		beforeEach(() => {
			(result = []),
				(callback = item => {
					result.push(item);

					return item;
				});
		});

		it('Should run each callback in order', async function() {
			const expectedResult = array.slice();

			await asyncMap(callback);

			expectedResult.every((expectedItem, index) =>
				expect(expectedItem).to.equal(result[index])
			);
		});

		it('Should map each item in order', async function() {
			const expectedResult = array.slice();

			const mappedArray = await asyncMap(callback);

			expectedResult.every(
				(expectedItem, index) =>
					expect(expectedItem).to.equal(mappedArray[index]) &&
					expect(expectedItem).to.equal(result[index])
			);
		});

		it('Should resolve to a new array', async function() {
			const mappedArray = await asyncMap(callback);

			expect(mappedArray).to.not.equal(array);
		});
	});

	describe('Given a sychronous callback and array', function() {
		let result, callback;

		beforeEach(() => {
			(result = []),
				(callback = item => {
					result.push(item);

					return item;
				});
		});

		it('Should run each callback in order', async function() {
			const expectedResult = array.slice();

			await asyncMap(callback, array);

			expectedResult.every((expectedItem, index) =>
				expect(expectedItem).to.equal(result[index])
			);
		});

		it('Should map each item in order', async function() {
			const expectedResult = array.slice();

			const mappedArray = await asyncMap(callback, array);

			expectedResult.every(
				(expectedItem, index) =>
					expect(expectedItem).to.equal(mappedArray[index]) &&
					expect(expectedItem).to.equal(result[index])
			);
		});

		it('Should resolve to a new array', async function() {
			const mappedArray = await asyncMap(callback, array);

			expect(mappedArray).to.not.equal(array);
		});
	});

	describe('Given an async callback', function() {
		let result, callback;

		beforeEach(() => {
			(result = []),
				(callback = item =>
					new Promise(resolve => {
						result.push(item);

						return resolve(item);
					}));
		});

		it('Should run each callback independently of order', async function() {
			const expectedResult = array.slice();

			await asyncMap(callback);

			expectedResult.every(item => expect(result).to.contain(item));
		});

		it('Should map each item independently of order', async function() {
			const expectedResult = array.slice();

			const mappedArray = await asyncMap(callback);

			expectedResult.every(
				expectedItem =>
					expect(result).to.contain(expectedItem) &&
					expect(mappedArray).to.contain(expectedItem)
			);
		});

		it('Should resolve to a new array', async function() {
			const mappedArray = await asyncMap(callback);

			expect(mappedArray).to.not.equal(array);
		});
	});

	describe('Given an async callback and array', function() {
		let result, callback;

		beforeEach(() => {
			(result = []),
				(callback = item =>
					new Promise(resolve => {
						result.push(item);

						return resolve(item);
					}));
		});

		it('Should run each callback independently of order', async function() {
			const expectedResult = array.slice();

			await asyncMap(callback, array);

			expectedResult.every(item => expect(result).to.contain(item));
		});

		it('Should map each item independently of order', async function() {
			const expectedResult = array.slice();

			const mappedArray = await asyncMap(callback, array);

			expectedResult.every(
				expectedItem =>
					expect(result).to.contain(expectedItem) &&
					expect(mappedArray).to.contain(expectedItem)
			);
		});

		it('Should resolve to a new array', async function() {
			const mappedArray = await asyncMap(callback, array);

			expect(mappedArray).to.not.equal(array);
		});
	});

	describe('Given a callback that throws an error', function() {
		const string = getString(),
			error = new Error(string),
			callback = () => {
				throw error;
			};

		it('Should reject with that error', async function() {
			await expect(asyncMap(callback)).to.rejectedWith(string);
		});
	});

	describe('Given a callback that throws an error and an array', function() {
		const string = getString(),
			error = new Error(string),
			callback = () => {
				throw error;
			};

		it('Should reject with that error', async function() {
			await expect(asyncMap(callback, array)).to.rejectedWith(string);
		});
	});

	describe('Given a callback that uses additional parameters', function() {
		let result, callback;

		beforeEach(() => {
			(result = []),
				(callback = (item, index, array) =>
					result.push({
						item,
						index,
						array
					}));
		});

		it('Should have the correct element', async function() {
			await asyncMap(callback);

			array.every((expectedItem, expectedIndex) => {
				const { item: actualItem } = result[expectedIndex];

				return expect(actualItem).to.equal(expectedItem);
			});
		});

		it('Should have correct index for each callback', async function() {
			await asyncMap(callback);

			array.every((item, expectedIndex) => {
				const { index: actualIndex } = result[expectedIndex];

				return expect(actualIndex).to.equal(expectedIndex);
			});
		});

		it('Should have access to the source array', async function() {
			await asyncMap(callback);

			array.every((item, index, expectedArray) => {
				const { array: actualArray } = result[index];

				return expect(actualArray).to.equal(expectedArray);
			});
		});
	});
});
