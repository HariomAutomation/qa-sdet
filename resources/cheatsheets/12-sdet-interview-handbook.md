# 📋 Senior SDET Interview Handbook

## Top 5 JavaScript/TypeScript Questions
1. **Event Loop**: Microtasks (Promise/queueMicrotask) execute before Macrotasks (setTimeout).
2. **`this` Binding**: Regular functions have dynamic caller binding; Arrow functions have lexical parent binding.
3. **Closures**: Functions bundle together with their surrounding lexical environment.
4. **Prototypes & Classes**: Classes in JS are syntactic sugar over prototype chains.
5. **Generics & Utility Types**: `<T>` enforces flexible type-safety; `Pick`, `Omit`, `Partial` manipulate types.

## Top 5 Automation Design Questions
1. **How to eliminate test flakiness?** Use Web-First auto-retrying assertions, avoid static sleeps, isolate test state per test context.
2. **How to handle auth state in Playwright?** Use `storageState` to log in once during global setup and reuse session cookies.
3. **Why use Playwright over Selenium?** Native CDP WebSockets connection, automatic waiting, microsecond browser context isolation.
4. **How to test microservices without spinning up 20 backends?** Contract testing with Pact.js and network interception with MSW / `page.route()`.
5. **How to speed up CI/CD execution?** Test sharding across parallel matrix runners, headless execution, resource aborting (images/css).
