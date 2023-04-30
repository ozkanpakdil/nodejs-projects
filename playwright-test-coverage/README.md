https://playwright.dev/docs/test-cli

https://playwright.tech/blog/tracking-frontend-coverage-with-playwright

npm test
npx playwright test
export NODE_OPTIONS=--openssl-legacy-provider

## Coverage formats

Helpful commands are the following:

- `npx nyc report --reporter=html` -> Writes an HTML report to `coverage/index.html`.
- `npx nyc report --reporter=lcov` -> commonly used to upload to Coveralls or [Codecov](https://about.codecov.io/).
- `npx nyc report --reporter=text` -> CLI output how the current code coverage per file and statement will look like.

