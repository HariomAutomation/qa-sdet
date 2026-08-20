# 🛠️ Type-Safe Test Utilities Library

Production-grade TypeScript library providing generic test data factories, test decorators (`@Step`, `@Retry`, `@Timeout`), and multi-environment configuration loaders.

## 🚀 Features

- **Generic Test Data Factory (`createDataFactory<T>`)**: Zero `any` test data generator with auto-inferred types and overrides.
- **Method Decorators**:
  - `@Step(name)`: Automatic test step execution logging and timing.
  - `@Retry(attempts, delayMs)`: Flaky action resilience.
  - `@Timeout(ms)`: Test step execution timeout enforcement.
- **ConfigLoader (`ConfigLoader.load()`)**: Type-safe environment variable parsing with sensible defaults.

## 🧪 Build & Test

```bash
npm run build
npm test
```
