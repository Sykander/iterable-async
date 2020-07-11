import * as AsyncArray from '../src/index.js';

const arr = new AsyncArray(1, '2', 3);
let sum: number = 0;

// Test we can use array methods
arr.asyncForEach((item: number) => {
	sum += item;
});

if (sum !== 6) {
	throw new Error('AsyncArray cannot be used properly with TypeScript.');
}
