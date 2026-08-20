# 📘 Module 3.4 — Cloud & Test Infrastructure

## Lesson 1: AWS, BrowserStack & Terraform Infrastructure as Code

---

## 1️⃣ BrowserStack / SauceLabs Cloud Grid Integration

Playwright tests ko cloud real devices (iPhone 15, Samsung Galaxy S24, Safari macOS) par run karne ke liye CDP endpoint connect kiya jata hai:

```typescript
import { chromium } from "playwright";

const caps = {
  browser: "chrome",
  os: "osx",
  os_version: "Sonoma",
  name: "Playwright Cloud Test",
  build: "playwright-build-1",
  "browserstack.username": process.env.BROWSERSTACK_USERNAME,
  "browserstack.accessKey": process.env.BROWSERSTACK_ACCESS_KEY,
};

const browser = await chromium.connect({
  wsEndpoint: `wss://cdp.browserstack.com/playwright?caps=${encodeURIComponent(JSON.stringify(caps))}`,
});

const page = await browser.newPage();
await page.goto("https://www.saucedemo.com");
await browser.close();
```

---

## 2️⃣ Terraform Test Infrastructure (`main.tf`)

```hcl
provider "aws" {
  region = "us-east-1"
}

# S3 Bucket for Allure and Playwright HTML Reports
resource "aws_s3_bucket" "test_reports" {
  bucket = "qa-automation-reports-sdet"
}

resource "aws_s3_bucket_website_configuration" "reports_site" {
  bucket = aws_s3_bucket.test_reports.id

  index_document {
    suffix = "index.html"
  }
}
```
