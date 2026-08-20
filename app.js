// ============================================================
// 🚀 Enterprise QA SDET Master Hub — Interactive Application
// ============================================================

let CURRICULUM_DATA = [];
let PROJECTS_DATA = [];

// LocalStorage Progress Tracking
const STORAGE_KEY = "sdet_course_progress_v1";

function getCompletedLessons() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  } catch (e) {
    return [];
  }
}

function setCompletedLessons(lessons) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(lessons));
  updateProgressTracker();
}

function toggleLessonComplete(filePath, event) {
  if (event) event.stopPropagation();
  const completed = getCompletedLessons();
  const index = completed.indexOf(filePath);
  if (index > -1) {
    completed.splice(index, 1);
  } else {
    completed.push(filePath);
  }
  setCompletedLessons(completed);
}

function updateProgressTracker() {
  const completed = getCompletedLessons();
  let totalLessons = 0;

  CURRICULUM_DATA.forEach((phase) => {
    phase.modules.forEach((mod) => {
      totalLessons += mod.lessons.length;
    });
  });

  if (totalLessons === 0) totalLessons = 22; // default fallback

  const pct = Math.round((completed.length / totalLessons) * 100);
  const fillEl = document.getElementById("progress-fill");
  const pctEl = document.getElementById("progress-pct");
  const textEl = document.getElementById("progress-text");

  if (fillEl) fillEl.style.width = `${pct}%`;
  if (pctEl) pctEl.innerText = `${pct}%`;
  if (textEl) textEl.innerText = `${completed.length} of ${totalLessons} lessons completed`;
}

// Tab Switching
document.querySelectorAll(".nav-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".nav-btn").forEach((b) => b.classList.remove("active"));
    document.querySelectorAll(".tab-content").forEach((t) => t.classList.remove("active"));

    btn.classList.add("active");
    const targetTab = btn.getAttribute("data-tab");
    document.getElementById(targetTab).classList.add("active");
  });
});

// Modal Management
const modalOverlay = document.getElementById("modal-overlay");
const modalBody = document.getElementById("modal-body");

function closeModal() {
  if (modalOverlay) modalOverlay.classList.remove("active");
}

if (modalOverlay) {
  modalOverlay.addEventListener("click", (e) => {
    if (e.target === modalOverlay) closeModal();
  });
}

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeModal();
});

// 1. Fetch & Render Curriculum Phases
async function loadCurriculum() {
  try {
    const res = await fetch("/api/curriculum");
    CURRICULUM_DATA = await res.json();
    renderPhases();
    updateProgressTracker();
  } catch (err) {
    console.error("Failed to load curriculum:", err);
  }
}

function renderPhases() {
  const container = document.getElementById("phases-container");
  if (!container) return;

  const completed = getCompletedLessons();

  container.innerHTML = CURRICULUM_DATA.map((phase) => {
    let phaseTotalLessons = 0;
    let phaseCompletedLessons = 0;

    phase.modules.forEach((mod) => {
      mod.lessons.forEach((l) => {
        phaseTotalLessons++;
        if (completed.includes(l.file)) phaseCompletedLessons++;
      });
    });

    const moduleItems = phase.modules
      .map((m) => `<li>${m.title} (${m.lessons.length} lessons)</li>`)
      .join("");

    return `
      <div class="card" onclick="openPhaseModal('${phase.id}')">
        <div>
          <div class="card-header">
            <span class="phase-tag ${phase.tagClass}">${phase.tag}</span>
            <span class="pill">${phaseCompletedLessons}/${phaseTotalLessons} Done</span>
          </div>
          <h3 class="card-title">${phase.name}</h3>
          <p class="card-desc">${phase.description}</p>
          <ul class="module-list">
            ${moduleItems}
          </ul>
        </div>
        <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 1rem; border-top: 1px solid var(--border-glass); padding-top: 1rem;">
          <span class="card-hint">Explore Lessons & Notes ➔</span>
          <span class="pill" style="color: var(--accent-cyan);">${phase.modules.length} Modules</span>
        </div>
      </div>
    `;
  }).join("");
}

// Open Phase Detail Modal
window.openPhaseModal = function (phaseId) {
  const phase = CURRICULUM_DATA.find((p) => p.id === phaseId);
  if (!phase) return;

  const completed = getCompletedLessons();

  let html = `
    <div style="margin-bottom: 1.5rem;">
      <span class="phase-tag ${phase.tagClass}">${phase.tag}</span>
      <h2 style="font-size: 1.8rem; font-weight: 800; color: #fff; margin-top: 0.5rem;">${phase.name}</h2>
      <p style="color: var(--text-muted); font-size: 1rem;">${phase.description}</p>
    </div>
  `;

  phase.modules.forEach((mod) => {
    html += `
      <div class="module-group">
        <h4 class="module-group-title">📂 ${mod.title}</h4>
        <div class="lessons-list">
    `;

    mod.lessons.forEach((lesson) => {
      const isChecked = completed.includes(lesson.file);
      html += `
        <div class="lesson-row">
          <div class="lesson-left">
            <input type="checkbox" class="lesson-checkbox" ${isChecked ? "checked" : ""} 
              onchange="toggleLessonComplete('${lesson.file}', event); openPhaseModal('${phase.id}');">
            <span class="lesson-name" onclick="openMarkdownModal('${lesson.file}', '${lesson.name}')">${lesson.name}</span>
          </div>
          <button class="lesson-btn" onclick="openMarkdownModal('${lesson.file}', '${lesson.name}')">Read Notes 📖</button>
        </div>
      `;
    });

    html += `
        </div>
      </div>
    `;
  });

  modalBody.innerHTML = html;
  modalOverlay.classList.add("active");
};

// Open Markdown Content Modal (Notes & Cheatsheets)
window.openMarkdownModal = async function (filePath, title) {
  modalBody.innerHTML = `
    <div style="text-align: center; padding: 3rem;">
      <h3 style="color: var(--accent-cyan);">⚡ Loading document...</h3>
      <p style="color: var(--text-muted);">${filePath}</p>
    </div>
  `;
  modalOverlay.classList.add("active");

  try {
    const res = await fetch(`/api/file?path=${encodeURIComponent(filePath)}`);
    const data = await res.json();

    if (data.error) {
      modalBody.innerHTML = `<div style="color: var(--accent-rose);"><h3>⚠️ Error Loading File</h3><p>${data.error}</p></div>`;
      return;
    }

    const htmlContent = marked.parse(data.content);

    modalBody.innerHTML = `
      <div style="margin-bottom: 1.5rem; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border-glass); padding-bottom: 1rem;">
        <div>
          <span class="pill" style="color: var(--accent-indigo);">${filePath}</span>
          <h2 style="font-size: 1.6rem; color: #fff; margin-top: 0.25rem;">${title || "Document Reader"}</h2>
        </div>
        <button class="btn-outline" onclick="navigator.clipboard.writeText(location.origin + '/${filePath}')">🔗 Copy Link</button>
      </div>
      <div class="markdown-body">
        ${htmlContent}
      </div>
    `;

    // Apply syntax highlighting
    modalBody.querySelectorAll("pre code").forEach((el) => {
      hljs.highlightElement(el);
    });

  } catch (err) {
    modalBody.innerHTML = `<div style="color: var(--accent-rose);"><h3>⚠️ Error</h3><p>${err.message}</p></div>`;
  }
};

// 2. Fetch & Render Projects Portfolio
async function loadProjects() {
  try {
    const res = await fetch("/api/projects");
    PROJECTS_DATA = await res.json();
    renderProjects();
  } catch (err) {
    console.error("Failed to load projects:", err);
  }
}

function renderProjects() {
  const container = document.getElementById("projects-container");
  if (!container) return;

  container.innerHTML = PROJECTS_DATA.map((proj) => `
    <div class="card" onclick="openProjectModal('${proj.id}')">
      <div>
        <div class="card-header">
          <span class="phase-tag tag-p2">${proj.tag}</span>
          <span class="pill">${proj.tech[0]}</span>
        </div>
        <h3 class="card-title">${proj.title}</h3>
        <p class="card-desc">${proj.desc}</p>
      </div>
      <div>
        <div class="tech-pills">
          ${proj.tech.map((t) => `<span class="pill">${t}</span>`).join("")}
        </div>
        <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--border-glass); padding-top: 1rem; margin-top: 0.5rem;">
          <span class="card-hint">Open Test Terminal & Docs ➔</span>
          <span class="pill" style="color: var(--accent-emerald);">Runnable</span>
        </div>
      </div>
    </div>
  `).join("");
}

// Open Project Test Runner & Terminal Modal
window.openProjectModal = function (projectId) {
  const project = PROJECTS_DATA.find((p) => p.id === projectId);
  if (!project) return;

  modalBody.innerHTML = `
    <div style="margin-bottom: 1.5rem;">
      <span class="phase-tag tag-p2">${project.tag}</span>
      <h2 style="font-size: 1.8rem; font-weight: 800; color: #fff; margin-top: 0.5rem;">${project.title}</h2>
      <p style="color: var(--text-muted); font-size: 1rem;">${project.desc}</p>
    </div>

    <div style="display: flex; gap: 0.5rem; margin-bottom: 1.5rem; flex-wrap: wrap;">
      ${project.tech.map((t) => `<span class="pill">${t}</span>`).join("")}
      <span class="pill" style="color: var(--accent-cyan); font-family: var(--font-mono);">${project.dir}</span>
    </div>

    <div style="display: flex; gap: 1rem; margin-bottom: 1rem;">
      <button id="run-project-test-btn" class="btn-primary" onclick="executeProjectTest('${project.id}')">
        ▶ Run Live Tests (${project.testCmd})
      </button>
      <button class="btn-outline" onclick="openMarkdownModal('${project.dir}/README.md', '${project.title} Documentation')">
        📖 View README
      </button>
    </div>

    <h4 style="color: var(--accent-cyan); margin-top: 1.5rem;">⚡ Real-Time Test Terminal</h4>
    <div id="project-terminal" class="terminal-window">// Click 'Run Live Tests' above to execute tests in this directory...</div>
  `;

  modalOverlay.classList.add("active");
};

// Execute Project Test via Backend API
window.executeProjectTest = async function (projectId) {
  const term = document.getElementById("project-terminal");
  const btn = document.getElementById("run-project-test-btn");

  if (term) term.innerText = `⚡ Executing test command in project environment...\nPlease wait...`;
  if (btn) {
    btn.disabled = true;
    btn.innerText = "⏳ Executing...";
  }

  try {
    const res = await fetch("/api/run-test", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ projectId }),
    });
    const data = await res.json();

    if (btn) {
      btn.disabled = false;
      btn.innerText = `▶ Run Live Tests (${data.command || "npm test"})`;
    }

    if (term) {
      term.innerText = `============================================================\n` +
        `📦 Project: ${data.project}\n` +
        `🔧 Command: ${data.command}\n` +
        `⏱️  Duration: ${data.durationSeconds}s | Status: ${data.success ? "✅ PASSED" : "❌ FAILED (Exit " + data.exitCode + ")"}\n` +
        `============================================================\n\n` +
        (data.stdout || data.stderr || "Execution completed with no output.");
    }
  } catch (err) {
    if (btn) {
      btn.disabled = false;
      btn.innerText = "▶ Run Live Tests";
    }
    if (term) term.innerText = `⚠️ Execution Failed: ${err.message}`;
  }
};

// 3. Live Code Playground Challenges
const challenges = {
  twoSum: {
    title: "1. Two Sum (HashMap Approach — O(N))",
    template: `function twoSum(nums, target) {
  // TODO: Return indices of two numbers adding up to target in O(N)
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    map.set(nums[i], i);
  }
  return [];
}

// Test Suite
const test1 = twoSum([2, 7, 11, 15], 9);
console.log("Test 1 [2,7,11,15] Target 9:", JSON.stringify(test1) === "[0,1]" ? "✅ PASS" : "❌ FAIL");

const test2 = twoSum([3, 2, 4], 6);
console.log("Test 2 [3,2,4] Target 6:", JSON.stringify(test2) === "[1,2]" ? "✅ PASS" : "❌ FAIL");`,
    solution: `function twoSum(nums, target) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) return [map.get(complement), i];
    map.set(nums[i], i);
  }
  return [];
}`,
  },
  validParentheses: {
    title: "2. Valid Parentheses (Stack Selector Matching)",
    template: `function isValidBrackets(s) {
  const stack = [];
  const map = { ")": "(", "}": "{", "]": "[" };
  for (const char of s) {
    if (["(", "{", "["].includes(char)) {
      stack.push(char);
    } else if (map[char]) {
      if (stack.pop() !== map[char]) return false;
    }
  }
  return stack.length === 0;
}

// Test Suite
console.log("Test 1 '()[]{}':", isValidBrackets("()[]{}") === true ? "✅ PASS" : "❌ FAIL");
console.log("Test 2 '(]':", isValidBrackets("(]") === false ? "✅ PASS" : "❌ FAIL");
console.log("Test 3 '([{}])':", isValidBrackets("([{}])") === true ? "✅ PASS" : "❌ FAIL");`,
    solution: `function isValidBrackets(s) {
  const stack = [];
  const map = { ")": "(", "}": "{", "]": "[" };
  for (const char of s) {
    if (["(", "{", "["].includes(char)) stack.push(char);
    else if (map[char] && stack.pop() !== map[char]) return false;
  }
  return stack.length === 0;
}`,
  },
  groupTestResults: {
    title: "3. Group Test Results (Array.reduce)",
    template: `function groupTestResults(results) {
  return results.reduce((acc, curr) => {
    const status = curr.status;
    if (!acc[status]) acc[status] = [];
    acc[status].push(curr.test);
    return acc;
  }, {});
}

// Test Suite
const suite = [
  { test: 'Auth E2E', status: 'pass' },
  { test: 'Checkout Flow', status: 'pass' },
  { test: 'Payment Gateway', status: 'fail' }
];

const grouped = groupTestResults(suite);
console.log("Grouped Results:", grouped);
console.log("Test Status:", grouped.pass.length === 2 && grouped.fail.length === 1 ? "✅ PASS" : "❌ FAIL");`,
    solution: `function groupTestResults(results) {
  return results.reduce((acc, curr) => {
    (acc[curr.status] = acc[curr.status] || []).push(curr.test);
    return acc;
  }, {});
}`,
  },
  flattenArray: {
    title: "4. Flatten Deeply Nested Array (Recursion)",
    template: `function flattenArray(arr) {
  const result = [];
  for (const item of arr) {
    if (Array.isArray(item)) {
      result.push(...flattenArray(item));
    } else {
      result.push(item);
    }
  }
  return result;
}

// Test Suite
const nested = [1, [2, [3, [4, 5]]]];
const flat = flattenArray(nested);
console.log("Flattened Array:", flat);
console.log("Test Status:", JSON.stringify(flat) === "[1,2,3,4,5]" ? "✅ PASS" : "❌ FAIL");`,
    solution: `function flattenArray(arr) {
  return arr.reduce((acc, val) => Array.isArray(val) ? acc.concat(flattenArray(val)) : acc.concat(val), []);
}`,
  },
  deepClone: {
    title: "5. Deep Clone Object Without JSON",
    template: `function deepClone(obj) {
  if (obj === null || typeof obj !== "object") return obj;
  if (Array.isArray(obj)) return obj.map(deepClone);
  const copy = {};
  for (const key of Object.keys(obj)) {
    copy[key] = deepClone(obj[key]);
  }
  return copy;
}

// Test Suite
const original = { user: 'Hariom', config: { retries: 3, browsers: ['chromium'] } };
const cloned = deepClone(original);
cloned.config.retries = 5;

console.log("Original retries:", original.config.retries);
console.log("Cloned retries:", cloned.config.retries);
console.log("Deep Isolation:", original.config.retries === 3 ? "✅ PASS" : "❌ FAIL");`,
    solution: `function deepClone(obj) {
  if (obj === null || typeof obj !== "object") return obj;
  if (Array.isArray(obj)) return obj.map(deepClone);
  const copy = {};
  for (const key of Object.keys(obj)) copy[key] = deepClone(obj[key]);
  return copy;
}`,
  },
  firstUniqueChar: {
    title: "6. First Unique Character in String",
    template: `function firstUniqueChar(str) {
  const count = {};
  for (const ch of str) count[ch] = (count[ch] || 0) + 1;
  for (const ch of str) {
    if (count[ch] === 1) return ch;
  }
  return null;
}

// Test Suite
console.log("Test 1 'automation' ->", firstUniqueChar("automation") === "u" ? "✅ PASS ('u')" : "❌ FAIL");
console.log("Test 2 'playwright' ->", firstUniqueChar("playwright") === "p" ? "✅ PASS ('p')" : "❌ FAIL");`,
    solution: `function firstUniqueChar(str) {
  const count = {};
  for (const ch of str) count[ch] = (count[ch] || 0) + 1;
  for (const ch of str) {
    if (count[ch] === 1) return ch;
  }
  return null;
}`,
  },
};

const challengeSelect = document.getElementById("challenge-select");
const codeArea = document.getElementById("code-area");
const consoleOutput = document.getElementById("console-output");
const runCodeBtn = document.getElementById("run-code-btn");
const showSolutionBtn = document.getElementById("show-solution-btn");
const resetCodeBtn = document.getElementById("reset-code-btn");

if (challengeSelect && codeArea) {
  codeArea.value = challenges[challengeSelect.value].template;

  challengeSelect.addEventListener("change", (e) => {
    const selected = challenges[e.target.value];
    if (selected) {
      codeArea.value = selected.template;
      consoleOutput.innerText = `// Loaded: ${selected.title}\n// Click 'Execute & Run Tests' to test your code.`;
    }
  });
}

if (runCodeBtn && codeArea && consoleOutput) {
  runCodeBtn.addEventListener("click", () => {
    consoleOutput.innerText = "";
    const originalLog = console.log;
    const logs = [];

    console.log = (...args) => {
      logs.push(args.map((a) => (typeof a === "object" ? JSON.stringify(a, null, 2) : a)).join(" "));
      originalLog.apply(console, args);
    };

    try {
      const code = codeArea.value;
      const fn = new Function(code);
      fn();
      consoleOutput.innerText = logs.length > 0 ? logs.join("\n") : "Execution complete with no output.";
    } catch (err) {
      consoleOutput.innerText = `⚠️ Runtime Error:\n${err.message}\n\nStack:\n${err.stack}`;
    } finally {
      console.log = originalLog;
    }
  });
}

if (showSolutionBtn && challengeSelect && consoleOutput) {
  showSolutionBtn.addEventListener("click", () => {
    const selected = challenges[challengeSelect.value];
    if (selected) {
      consoleOutput.innerText = `💡 Model Solution:\n\n${selected.solution}`;
    }
  });
}

if (resetCodeBtn && challengeSelect && codeArea && consoleOutput) {
  resetCodeBtn.addEventListener("click", () => {
    const selected = challenges[challengeSelect.value];
    if (selected) {
      codeArea.value = selected.template;
      consoleOutput.innerText = `// Code Reset.\n// Click 'Execute & Run Tests' to test.`;
    }
  });
}

// Initial Boot
window.addEventListener("DOMContentLoaded", () => {
  loadCurriculum();
  loadProjects();
});
