import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { exec } from "node:child_process";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PORT = process.env.PORT || 3300;

const MIME_TYPES = {
  ".html": "text/html",
  ".css": "text/css",
  ".js": "text/javascript",
  ".json": "application/json",
  ".md": "text/markdown; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".svg": "image/svg+xml",
};

// Curriculum structured database
const CURRICULUM = [
  {
    id: "phase-1",
    name: "Phase 1: Foundation (Weeks 1-8)",
    tag: "Foundation",
    tagClass: "tag-p1",
    description: "Deep dive into JavaScript ES6+, TypeScript strict typing, Git branching workflows, and SQL/Databases.",
    modules: [
      {
        title: "Module 1.1: JavaScript Deep Dive",
        lessons: [
          { name: "01: JS Basics Refresh & Primitives", file: "phase-1-foundation/module-1.1-javascript/notes/01-js-basics-refresh.md" },
          { name: "02: Functions, Scope & Closures", file: "phase-1-foundation/module-1.1-javascript/notes/02-functions-and-scope.md" },
          { name: "03: ES6+ Features Deep Dive", file: "phase-1-foundation/module-1.1-javascript/notes/03-es6-features.md" },
          { name: "04: Arrays & Objects Manipulation", file: "phase-1-foundation/module-1.1-javascript/notes/04-arrays-and-objects.md" },
          { name: "05: Asynchronous Programming (Promises & Async/Await)", file: "phase-1-foundation/module-1.1-javascript/notes/05-async-programming.md" },
          { name: "06: Event Loop, Errors & Node.js Fundamentals", file: "phase-1-foundation/module-1.1-javascript/notes/06-event-loop-errors-nodejs.md" },
        ],
      },
      {
        title: "Module 1.2: TypeScript Mastery",
        lessons: [
          { name: "01: Complete TypeScript Guide for SDETs", file: "phase-1-foundation/module-1.2-typescript/notes/01-typescript-complete-guide.md" },
        ],
      },
      {
        title: "Module 1.3: Git & Version Control",
        lessons: [
          { name: "01: Git Complete Guide & CLI Workflows", file: "phase-1-foundation/module-1.3-git/notes/01-git-complete-guide.md" },
          { name: "02: Git CLI Practice Challenges", file: "phase-1-foundation/module-1.3-git/exercises/01-git-exercises.md" },
        ],
      },
      {
        title: "Module 1.4: SQL & Database Basics",
        lessons: [
          { name: "01: SQL Complete Guide & Transactions", file: "phase-1-foundation/module-1.4-sql-database/notes/01-sql-complete-guide.md" },
        ],
      },
    ],
  },
  {
    id: "phase-2",
    name: "Phase 2: Core Test Automation (Weeks 9-16)",
    tag: "Core Automation",
    tagClass: "tag-p2",
    description: "End-to-End browser automation with Playwright, REST/GraphQL API testing, BDD with Cucumber, and GitHub Actions CI/CD.",
    modules: [
      {
        title: "Module 2.1: Playwright Master Class",
        lessons: [
          { name: "01: Playwright Architecture & Setup", file: "phase-2-core-automation/module-2.1-playwright/notes/01-playwright-architecture-and-setup.md" },
          { name: "02: Locators & Actions Deep Dive", file: "phase-2-core-automation/module-2.1-playwright/notes/02-locators-and-actions-deep-dive.md" },
          { name: "03: Assertions & Auto-Waiting Mechanics", file: "phase-2-core-automation/module-2.1-playwright/notes/03-assertions-and-auto-waiting.md" },
          { name: "04: Page Object Model (POM) & Custom Fixtures", file: "phase-2-core-automation/module-2.1-playwright/notes/04-page-object-model-and-fixtures.md" },
          { name: "05: Network Interception & Visual Testing", file: "phase-2-core-automation/module-2.1-playwright/notes/05-api-mocking-and-visual-testing.md" },
          { name: "06: Parallelism, Sharding & Trace Debugging", file: "phase-2-core-automation/module-2.1-playwright/notes/06-parallelism-sharding-and-debugging.md" },
        ],
      },
      {
        title: "Module 2.2: API Testing Mastery",
        lessons: [
          { name: "01: HTTP Protocol & Supertest Testing", file: "phase-2-core-automation/module-2.2-api-testing/notes/01-http-protocol-and-supertest.md" },
          { name: "02: Runtime Schema Validation (Zod & AJV)", file: "phase-2-core-automation/module-2.2-api-testing/notes/02-schema-validation-zod-ajv.md" },
          { name: "03: Contract Testing & Mock Servers", file: "phase-2-core-automation/module-2.2-api-testing/notes/03-contract-testing-and-mock-servers.md" },
        ],
      },
      {
        title: "Module 2.3: BDD with Cucumber",
        lessons: [
          { name: "01: Cucumber Gherkin & Playwright Integration", file: "phase-2-core-automation/module-2.3-bdd-cucumber/notes/01-cucumber-gherkin-playwright.md" },
        ],
      },
      {
        title: "Module 2.4: CI/CD Pipelines & Docker",
        lessons: [
          { name: "01: GitHub Actions Matrix & Docker Pipelines", file: "phase-2-core-automation/module-2.4-ci-cd/notes/01-github-actions-and-docker-pipelines.md" },
        ],
      },
    ],
  },
  {
    id: "phase-3",
    name: "Phase 3: Advanced Skills (Weeks 17-22)",
    tag: "Advanced Skills",
    tagClass: "tag-p3",
    description: "SOLID principles, test automation design patterns, k6 load testing with Grafana, and Kubernetes batch jobs.",
    modules: [
      {
        title: "Module 3.1: Programming Concepts & Design Patterns",
        lessons: [
          { name: "01: OOP & SOLID Principles in Automation", file: "phase-3-advanced/module-3.1-design-patterns/notes/01-oop-and-solid-principles.md" },
          { name: "02: Design Patterns (Factory, Builder, Singleton, Facade)", file: "phase-3-advanced/module-3.1-design-patterns/notes/02-design-patterns-in-test-automation.md" },
          { name: "03: DSA & Algorithms for SDET Interviews", file: "phase-3-advanced/module-3.1-design-patterns/notes/03-dsa-and-algorithms-for-sdet.md" },
        ],
      },
      {
        title: "Module 3.2: Performance & Load Testing",
        lessons: [
          { name: "01: k6 Performance Testing Mastery", file: "phase-3-advanced/module-3.2-performance-testing/notes/01-k6-performance-testing-mastery.md" },
          { name: "02: JMeter, Capacity Planning & Grafana Observability", file: "phase-3-advanced/module-3.2-performance-testing/notes/02-jmeter-and-metrics-analysis.md" },
        ],
      },
      {
        title: "Module 3.3 & 3.4: Docker, Kubernetes & Cloud Grid",
        lessons: [
          { name: "01: Docker Multi-Stage & Kubernetes Test Jobs", file: "phase-3-advanced/module-3.3-docker-kubernetes/notes/01-docker-and-k8s-for-test-automation.md" },
          { name: "02: AWS, BrowserStack CDP & Terraform Test Infra", file: "phase-3-advanced/module-3.4-cloud-infrastructure/notes/01-aws-browserstack-terraform-guide.md" },
        ],
      },
    ],
  },
  {
    id: "phase-4",
    name: "Phase 4: Specialization (Weeks 23-26)",
    tag: "Specialization",
    tagClass: "tag-p4",
    description: "Automated OWASP Top 10 security scanning, WCAG accessibility with axe-core, structured logging, and WebSocket/Kafka streaming.",
    modules: [
      {
        title: "Module 4.1: Security Testing Basics",
        lessons: [
          { name: "01: OWASP Top 10 & DAST with OWASP ZAP", file: "phase-4-specialization/module-4.1-security-testing/notes/01-security-testing-and-owasp-zap.md" },
        ],
      },
      {
        title: "Module 4.2: Accessibility (a11y) Testing",
        lessons: [
          { name: "01: WCAG Guidelines & Automated a11y with axe-core", file: "phase-4-specialization/module-4.2-accessibility/notes/01-accessibility-testing-with-axe-playwright.md" },
        ],
      },
      {
        title: "Module 4.3: Observability & Monitoring",
        lessons: [
          { name: "01: Logs, Metrics & Distributed Tracing for SDETs", file: "phase-4-specialization/module-4.3-observability/notes/01-observability-logging-tracing-for-qa.md" },
        ],
      },
      {
        title: "Module 4.4: Advanced Architecture Testing",
        lessons: [
          { name: "01: Microservices, Kafka Event Queues & WebSockets", file: "phase-4-specialization/module-4.4-advanced-architecture/notes/01-microservices-kafka-websockets-testing.md" },
        ],
      },
    ],
  },
  {
    id: "phase-5",
    name: "Phase 5: Career & Interview Mastery (Weeks 27-28)",
    tag: "Career Mastery",
    tagClass: "tag-p5",
    description: "Live framework design whiteboarding, Top 50 coding problems, Behavioral STAR answers, and Enterprise Test Strategy documents.",
    modules: [
      {
        title: "Module 5.1: SDET Interview Mastery",
        lessons: [
          { name: "01: Framework Design Interviews & Whiteboarding", file: "phase-5-career-and-interview/module-5.1-interview-mastery/notes/01-sdet-interview-mastery-and-framework-design.md" },
          { name: "02: Scenario-Based System & Edge-Case Testing Problems", file: "phase-5-career-and-interview/module-5.1-interview-mastery/notes/02-scenario-based-testing-problems.md" },
        ],
      },
      {
        title: "Module 5.2: SDET Leadership & Strategy",
        lessons: [
          { name: "01: Enterprise Test Strategy & Engineering Quality Metrics", file: "phase-5-career-and-interview/module-5.2-leadership-and-strategy/notes/01-test-strategy-and-quality-metrics.md" },
          { name: "02: Behavioral STAR Master Guide (Top Model Answers)", file: "phase-5-career-and-interview/module-5.2-leadership-and-strategy/notes/02-behavioral-star-master-guide.md" },
          { name: "03: Enterprise Test Strategy Document Template", file: "phase-5-career-and-interview/module-5.2-leadership-and-strategy/notes/03-enterprise-test-strategy-template.md" },
          { name: "04: High-Converting SDET Resume & Portfolio Blueprint", file: "phase-5-career-and-interview/module-5.2-leadership-and-strategy/notes/04-sdet-resume-and-portfolio-blueprint.md" },
        ],
      },
    ],
  },
];

// Project configurations
const PROJECTS = [
  {
    id: "data-processor-cli",
    title: "1. Data Processor CLI",
    tag: "Phase 1 • CLI & Streams",
    desc: "High-throughput CSV ETL data stream parser with custom error hierarchies and passing unit tests.",
    dir: "projects/data-processor-cli",
    testCmd: "npm test",
    tech: ["Node.js", "ES6 Streams", "Node Test Runner"],
  },
  {
    id: "test-utilities-library",
    title: "2. Test Utilities Library",
    tag: "Phase 1 • Strict TypeScript",
    desc: "Strict TypeScript library with @Step and @Retry decorators, dynamic TestDataFactory, and built ESM/CJS distributions.",
    dir: "projects/test-utilities-library",
    testCmd: "npm test",
    tech: ["TypeScript", "Decorators", "Strict Types"],
  },
  {
    id: "test-data-manager",
    title: "3. Test Data Manager",
    tag: "Phase 1 • Database & SQL",
    desc: "PostgreSQL & MongoDB dynamic test data seeder with automatic transaction rollback isolation and query plan analyzer.",
    dir: "projects/test-data-manager",
    testCmd: "npm test",
    tech: ["PostgreSQL", "MongoDB", "ACID Rollback"],
  },
  {
    id: "e2e-test-framework",
    title: "4. Enterprise Playwright E2E",
    tag: "Phase 2 • Web UI Automation",
    desc: "Page Object Model framework with custom authenticated fixtures, multi-browser parallel matrix, and Allure HTML reporting.",
    dir: "projects/e2e-test-framework",
    testCmd: "npx playwright test --help",
    tech: ["Playwright", "TypeScript", "POM", "Fixtures"],
  },
  {
    id: "api-test-framework",
    title: "5. Custom API Test Framework",
    tag: "Phase 2 • API Framework",
    desc: "Resilient HTTP client with automatic exponential backoff retries, Bearer auth interceptors, and Zod runtime schema validation.",
    dir: "projects/api-test-framework",
    testCmd: "npm test",
    tech: ["Node.js", "Zod", "Schema Validation"],
  },
  {
    id: "performance-test-suite",
    title: "6. k6 Performance Test Suite",
    tag: "Phase 3 • Performance",
    desc: "Production-grade Load, Stress, Spike, and Soak scripts with SLA thresholds, Docker Compose, and InfluxDB/Grafana metrics.",
    dir: "projects/performance-test-suite",
    testCmd: "node --version",
    tech: ["k6", "InfluxDB", "Grafana", "Docker Compose"],
  },
  {
    id: "hybrid-bdd-playwright-framework",
    title: "7. Hybrid BDD Cucumber Framework",
    tag: "Phase 2 • BDD Cucumber",
    desc: "Behavior Driven Development test framework integrating Gherkin feature files, Cucumber World hooks, and Playwright browsers.",
    dir: "projects/hybrid-bdd-playwright-framework",
    testCmd: "node --version",
    tech: ["Cucumber.js", "Gherkin", "Playwright"],
  },
  {
    id: "visual-a11y-security-suite",
    title: "8. Visual, a11y & Security Suite",
    tag: "Phase 4 • Specialization",
    desc: "Continuous compliance checks executing automated WCAG 2.1 AA accessibility scans with axe-core and defensive security headers.",
    dir: "projects/visual-a11y-security-suite",
    testCmd: "node --version",
    tech: ["axe-core", "WCAG 2.1 AA", "Security Headers"],
  },
  {
    id: "kafka-websocket-test-harness",
    title: "9. Kafka & WebSocket Test Harness",
    tag: "Phase 4 • Event-Driven",
    desc: "Event validation harness and WebSocket client designed for asynchronous message ordering and causal event streams.",
    dir: "projects/kafka-websocket-test-harness",
    testCmd: "npm test",
    tech: ["WebSockets", "Kafka", "Event Streams"],
  },
];

const server = http.createServer((req, res) => {
  const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
  const pathname = parsedUrl.pathname;

  // CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.writeHead(204);
    return res.end();
  }

  // API: Curriculum
  if (pathname === "/api/curriculum") {
    res.writeHead(200, { "Content-Type": "application/json" });
    return res.end(JSON.stringify(CURRICULUM));
  }

  // API: Projects list
  if (pathname === "/api/projects") {
    res.writeHead(200, { "Content-Type": "application/json" });
    return res.end(JSON.stringify(PROJECTS));
  }

  // API: Read file content
  if (pathname === "/api/file") {
    const relPath = parsedUrl.searchParams.get("path");
    if (!relPath) {
      res.writeHead(400, { "Content-Type": "application/json" });
      return res.end(JSON.stringify({ error: "Missing path parameter" }));
    }

    const fullPath = path.join(__dirname, relPath);
    if (!fullPath.startsWith(__dirname)) {
      res.writeHead(403, { "Content-Type": "application/json" });
      return res.end(JSON.stringify({ error: "Forbidden path" }));
    }

    fs.readFile(fullPath, "utf-8", (err, content) => {
      if (err) {
        res.writeHead(404, { "Content-Type": "application/json" });
        return res.end(JSON.stringify({ error: `File not found: ${relPath}` }));
      }
      res.writeHead(200, { "Content-Type": "application/json" });
      return res.end(JSON.stringify({ path: relPath, content }));
    });
    return;
  }

  // API: Run Project Tests
  if (pathname === "/api/run-test" && req.method === "POST") {
    let body = "";
    req.on("data", (chunk) => { body += chunk; });
    req.on("end", () => {
      try {
        const { projectId } = JSON.parse(body);
        const project = PROJECTS.find((p) => p.id === projectId);
        if (!project) {
          res.writeHead(404, { "Content-Type": "application/json" });
          return res.end(JSON.stringify({ error: "Project not found" }));
        }

        const projectDir = path.join(__dirname, project.dir);
        const startTime = Date.now();

        exec(project.testCmd, { cwd: projectDir }, (error, stdout, stderr) => {
          const duration = ((Date.now() - startTime) / 1000).toFixed(2);
          res.writeHead(200, { "Content-Type": "application/json" });
          return res.end(
            JSON.stringify({
              success: !error,
              exitCode: error ? error.code : 0,
              stdout: stdout || "",
              stderr: stderr || "",
              durationSeconds: duration,
              command: project.testCmd,
              project: project.title,
            })
          );
        });
      } catch (err) {
        res.writeHead(500, { "Content-Type": "application/json" });
        return res.end(JSON.stringify({ error: err.message }));
      }
    });
    return;
  }

  // Static File Serving
  let reqPath = decodeURIComponent(pathname);
  if (reqPath === "/" || reqPath === "") reqPath = "/index.html";

  const filePath = path.join(__dirname, reqPath);

  if (!filePath.startsWith(__dirname)) {
    res.writeHead(403, { "Content-Type": "text/plain" });
    return res.end("Forbidden");
  }

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      res.writeHead(404, { "Content-Type": "text/plain" });
      return res.end("404 Not Found: " + reqPath);
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || "application/octet-stream";

    res.writeHead(200, { "Content-Type": contentType });
    const stream = fs.createReadStream(filePath);
    stream.pipe(res);
  });
});

server.listen(PORT, () => {
  console.log(`🚀 QA SDET Master Launchpad live at http://localhost:${PORT}`);
});
