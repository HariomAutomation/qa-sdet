# 📘 Module 2.4 — CI/CD Pipelines & Docker for Test Automation

## Lesson 1: GitHub Actions Matrix Strategy, Dockerization & Test Artifacts

---

## 1️⃣ GitHub Actions Multi-Browser Matrix Pipeline (`.github/workflows/e2e.yml`)

```yaml
name: Playwright E2E & API Regression Suite

on:
  push:
    branches: [main, master]
  pull_request:
    branches: [main, master]
  schedule:
    - cron: "0 2 * * *" # Nightly build at 2:00 AM UTC

jobs:
  test:
    name: Run Tests on ${{ matrix.project }}
    timeout-minutes: 45
    runs-on: ubuntu-latest
    strategy:
      fail-fast: false
      matrix:
        project: [chromium, firefox, webkit]
        shardIndex: [1, 2]
        shardTotal: [2]

    steps:
      - name: Checkout Code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: "npm"

      - name: Install Dependencies
        run: npm ci

      - name: Cache Playwright Browsers
        uses: actions/cache@v4
        id: playwright-cache
        with:
          path: ~/.cache/ms-playwright
          key: ${{ runner.os }}-playwright-${{ hashFiles('**/package-lock.json') }}

      - name: Install Playwright Browsers
        if: steps.playwright-cache.outputs.cache-hit != 'true'
        run: npx playwright install --with-deps

      - name: Run Sharded Playwright Tests
        run: >
          npx playwright test
          --project=${{ matrix.project }}
          --shard=${{ matrix.shardIndex }}/${{ matrix.shardTotal }}

      - name: Upload Test Results / Blob Reports
        if: always()
        uses: actions/upload-artifact@v4
        with:
          name: blob-report-${{ matrix.project }}-${{ matrix.shardIndex }}
          path: blob-report/
          retention-days: 14
```

---

## 2️⃣ Dockerizing E2E Tests (`Dockerfile`)

```dockerfile
# Official Microsoft Playwright Image with pre-installed browser binaries
FROM mcr.microsoft.com/playwright:v1.42.0-jammy

WORKDIR /app

# Install dependencies with lockfile
COPY package*.json ./
RUN npm ci

# Copy source code and test files
COPY . .

# Default command: Run Playwright test suite
CMD ["npx", "playwright", "test"]
```

Run tests with Docker Compose (`docker-compose.yml`):
```yaml
version: "3.8"
services:
  e2e-tests:
    build: .
    environment:
      - BASE_URL=https://www.saucedemo.com
      - CI=true
    volumes:
      - ./playwright-report:/app/playwright-report
      - ./test-results:/app/test-results
```
