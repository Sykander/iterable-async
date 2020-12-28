# Contributing

Development is open to contribution, check the project board "Development" for tickets.

## Scripts

| Script | Description |
|--|--|
| lint | Lints the project and returns a report |
| lint:check | Returns a report on lint issues in the project |
| lint:fix | Fixes lint issues in the project and returns a report on the ones which couldn't be fixed |
| lint:report | Generates lint-summary.json in the reports folder |
| test | Runs all tests and returns a report on which pass/fail |
| test:unit-tests | Runs only unit tests and returns a report on which pass/fail |
| test:unit-tests-report | Generates unit-tests-summary.json in reports |
| test:code-style | Runs only code checks and returns a report on which pass/fail |
| test:type-definitions | Attempt to compile and create type definitions for the project |
| test:coverage | Generates coverage-summary.json in reports and confirms whether the coverage criteria is met |
| docs | Generates the JsDocs html files and serves them up locally for viewing |
| docs:generate | Generates the JsDoc html files in the docs directory |
| docs:show | Launches a http server to serve up the docs locally for viewing |

### Examples

Run all lint tests
``` sh
 $ npm run lint
```

Serve docs locally
``` sh
 $ npm run docs
```

## Commit Rules

* All commits should pass the lint check commands
* Commit messages should follow below format

```
Ticket Title
- What you did
- What else you did
```

## Ticket Rules

* All code must pass the lint check
* All code should pass all tests
* All bugfixes should have a new test
* All code should be fully documented using JsDoc
* All PRs must be code reviewed
