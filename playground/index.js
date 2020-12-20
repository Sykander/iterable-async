const AsyncArray = require('iterable-async'),
	faker = require('faker');

// Generate some fake users
const users = [1, 2, 3, 4, 5].map(() => ({
	name: faker.name.findName(),
	email: faker.internet.email()
}));

// Async Sort
const sortedUsers = await AsyncArray.asyncSort(
	users,
	async ({ email: emailA }, { email: emailB }) =>
		await emailA.localeCompare(emailB)
);

console.log('Asynchronously sorted users');
console.table(sortedUsers);
