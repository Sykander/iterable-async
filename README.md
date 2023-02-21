# Iterable Async 
[![Try iterable-async on RunKit](https://badge.runkitcdn.com/iterable-async.svg)](https://npm.runkit.com/iterable-async)
[![Documentation](https://inch-ci.org/github/dwyl/hapi-auth-jwt2.svg?branch=master)](https://github.com/Sykander/iterable-async/wiki)
[![Known Vulnerabilities](https://snyk.io/test/github/Sykander/iterable-async/badge.svg?targetFile=package.json)](https://snyk.io/test/github/Sykander/iterable-async?targetFile=package.json)

A collection of methods for looping iterable objects asynchronously using something similar to the Array api.

## Installation

``` sh
 $ npm install iterable-async
```

## Dependencies

* None

## Supports

* JavaScript
* TypeScript

## Usage

***ES6 Format***
``` js
const {
	asyncFind,
	asyncFindIndex,
	asyncFilter,
	asyncForEach,
	asyncMap,
	asyncMapSort,
	asyncReduce,
	asyncSort
} = require('iterable-async');
```

***TypeScript Format***
``` ts
import {
	asyncFind,
	asyncFindIndex,
	asyncFilter,
	asyncForEach,
	asyncMap,
	asyncMapSort,
	asyncReduce,
	asyncSort
} from "iterable-async";
```

## Functions

| Function | Description | Wiki |
| -- | -- | -- |
| **asyncFilter** | Filter an iterable object asynchronously. | [wiki](https://github.com/Sykander/iterable-async/wiki/Async-Filter) |
| **asyncFindIndex** | Find an item's index in an iterable object asynchronously | [wiki](https://github.com/Sykander/iterable-async/wiki/Async-Find-Index) |
| **asyncFind** | Find an item in an iterable object asynchronously | [wiki](https://github.com/Sykander/iterable-async/wiki/Async-Filter) |
| **asyncForEach** | Loop over an iterable object asynchronously | [wiki](https://github.com/Sykander/iterable-async/wiki/Async-For-Each) |
| **asyncMapSort** | Map an iterable object asynchronously and then resolve when it's sorted, this method is much more efficient than running a regular `asyncSort` when done with a synchronous comparison function | [wiki](https://github.com/Sykander/iterable-async/wiki/Async-Map-Sort) |
| **asyncMap** | Map an iterable object asynchronously | [wiki](https://github.com/Sykander/iterable-async/wiki/Async-Map) |
| **asyncReduce** | Reduce an iterable object asynchronously | [wiki](https://github.com/Sykander/iterable-async/wiki/Async-Reduce) |
| **asyncSort** | Sort an iterable object asynchronously | [wiki](https://github.com/Sykander/iterable-async/wiki/Async-Sort) |
