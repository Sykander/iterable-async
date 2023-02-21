# Contributing

Development is open to contribution, check the project board "Development" for tickets.

## Scripts

| Script | Description |
|--|--|
| build | Builds the project docs, reports and types |
| build:docs | Builds the project docs |
| build:reports | Builds the project reports |
| build:types | Builds the project types |
| docs | Generates the docs and reports and then serves them locally |
| docs:generate | Generates the docs and reports |
| docs:show | Launches a http server to serve up the docs locally |
| lint | Lints the project and returns a report |
| lint:check | Returns a report on lint issues in the project |
| lint:fix | Fixes lint issues in the project and returns a report on the ones which couldn't be fixed |
| lint:report | Generates lint-summary.json in the reports folder |
| test | Runs all tests and returns a report on which pass/fail |
| test:unit-tests | Runs only unit tests and returns a report on which pass/fail |
| test:code-style | Runs only code checks and returns a report on which pass/fail |
| test:build-types | Attempt to build the project type declarations |
| test:coverage | Generates coverage-summary.json in reports and confirms whether the coverage criteria is met |

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
