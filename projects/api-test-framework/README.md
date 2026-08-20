# 🌐 Custom API Test Framework

Production-ready REST API Automation Framework built with pure ES Modules, featuring automatic retries, interceptors, service abstraction layers, and JSON schema validation.

## 🚀 Key Capabilities

- **Resilient Request Execution**: Automatic retry with linear backoff for flaky endpoints.
- **Service-Oriented Architecture**: Clean decoupling of HTTP transport logic (`ApiClient`) and business domain endpoints (`UserService`).
- **Schema Validation**: Lightweight runtime validation ensuring backend payloads strictly adhere to expected types.

## 🧪 Run Tests

```bash
npm test
```
