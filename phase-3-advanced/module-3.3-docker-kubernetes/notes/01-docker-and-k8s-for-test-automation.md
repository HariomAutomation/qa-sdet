# 📘 Module 3.3 — Docker & Kubernetes for Test Automation

## Lesson 1: Docker Containers & Kubernetes Parallel Test Grids

---

## 1️⃣ Docker Multi-Stage Build for Test Suites

```dockerfile
# Stage 1: Dependency builder
FROM node:20-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

# Stage 2: Test execution runtime
FROM mcr.microsoft.com/playwright:v1.42.0-jammy AS runner
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

CMD ["npx", "playwright", "test"]
```

---

## 2️⃣ Kubernetes Test Job (`test-job.yaml`)

Kubernetes mein tests ko ephemeral **Batch Jobs** ya **CronJobs** (nightly runs) ki tarah run kiya jata hai. Test complete hone par Pod automatically terminate ho jata hai, saving cloud costs:

```yaml
apiVersion: batch/v1
kind: Job
metadata:
  name: e2e-nightly-regression
spec:
  parallelism: 4 # Run 4 parallel test pods simultaneously!
  completions: 4
  template:
    spec:
      containers:
        - name: playwright-runner
          image: mycompany/e2e-tests:v1.0.0
          env:
            - name: BASE_URL
              value: "https://staging.example.com"
      restartPolicy: Never
  backoffLimit: 1
```
