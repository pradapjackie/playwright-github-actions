# Test Execution in Local

```sh
npm i
npx playwright test
npm run test
```

# Test Execution in Docker

```sh
docker build -t playwright-tests .
npm i
docker run --rm -v $(pwd):/app -v $(pwd)/playwright-report:/app/playwright-report -w /app playwright-tests
```
