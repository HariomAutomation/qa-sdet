# 📘 Module 1.3 — Git & Version Control Complete Guide

> **Time:** ~6-8 hours  
> **Goal:** Git confident use karna — daily workflow + advanced commands

---

## 1️⃣ Git Fundamentals

### Setup
```bash
git config --global user.name "Hariom"
git config --global user.email "hariom@example.com"
git config --global init.defaultBranch main
git config --global core.editor "code --wait"

# Check config
git config --list
```

### Basic Workflow
```bash
# Initialize
git init                      # Naya repo banao
git clone <url>               # Existing repo clone karo

# Stage → Commit cycle
git status                    # Changes dekho
git add <file>                # Specific file stage
git add .                     # Sab stage karo
git add -p                    # Interactive staging (chunks select karo)

git commit -m "feat: add login test"   # Commit
git commit -am "fix: typo"            # Stage + commit (tracked files)
git commit --amend                     # Last commit modify karo

# View history
git log                       # Full history
git log --oneline             # Compact view
git log --oneline --graph     # Branch graph
git log -n 5                  # Last 5 commits
git log --author="Hariom"     # Filter by author
git log -- path/to/file       # File ki history

# Differences
git diff                      # Unstaged changes
git diff --staged             # Staged changes
git diff main..feature        # Branch comparison
git diff HEAD~3               # Last 3 commits se comparison

# Stash — temporarily changes save karo
git stash                     # Save current changes
git stash save "WIP: login"   # Named stash
git stash list                # Sab stashes dekho
git stash pop                 # Apply + delete latest stash
git stash apply stash@{1}     # Specific stash apply karo (delete nahi)
git stash drop stash@{0}      # Delete a stash
```

### Commit Message Convention (Conventional Commits)
```
<type>[optional scope]: <description>

Types:
  feat:     New feature
  fix:      Bug fix
  docs:     Documentation changes
  style:    Formatting (no code change)
  refactor: Code restructuring (no feature/fix)
  test:     Adding/fixing tests
  chore:    Build process, dependencies
  ci:       CI/CD changes
  perf:     Performance improvements

Examples:
  feat: add user registration API
  fix(auth): resolve token expiry issue
  test: add unit tests for Calculator class
  docs: update README with setup instructions
  refactor(api): extract validation middleware
```

---

## 2️⃣ Branching Strategy

```bash
# Create & switch
git branch feature/login-test    # Branch banao
git checkout feature/login-test  # Switch karo
git checkout -b feature/signup   # Create + switch (shortcut)
git switch feature/login-test    # Modern switch command
git switch -c feature/new        # Modern create + switch

# List branches
git branch           # Local branches
git branch -r        # Remote branches
git branch -a        # All branches
git branch -v        # With last commit

# Delete branch
git branch -d feature/done       # Safe delete (merged check)
git branch -D feature/abandoned  # Force delete

# Merge
git checkout main
git merge feature/login-test     # Merge feature into main
git merge --no-ff feature/test   # Always create merge commit
```

### Branch Naming Convention
```
feature/TICKET-123-add-login-test
bugfix/TICKET-456-fix-flaky-test
hotfix/critical-auth-failure
release/v2.1.0
test/experiment-parallel-execution
```

---

## 3️⃣ Advanced Git

### Rebase (Clean History)
```bash
# Rebase — apni branch ko main ke TOP par rakho
git checkout feature/login
git rebase main
# Merge commit nahi banta — linear history ✅

# Interactive rebase — commits squash/edit karo
git rebase -i HEAD~3
# Editor mein:
# pick abc123 feat: add login page
# squash def456 fix: typo in login
# squash ghi789 style: format login code
# Result: 3 commits → 1 clean commit

# ⚠️ RULE: PUBLIC branches (main, develop) par rebase KABHI mat karo!
# Sirf apni local/feature branches par karo
```

### Cherry-Pick
```bash
# Specific commit ko current branch mein lao
git cherry-pick <commit-hash>
git cherry-pick abc123 def456    # Multiple commits
git cherry-pick abc123 --no-commit  # Stage karo, commit mat karo
```

### Reset (Undo Changes)
```bash
# Soft — commits undo, changes staged
git reset --soft HEAD~1

# Mixed (default) — commits undo, changes unstaged
git reset HEAD~1

# Hard — commits undo, changes DELETE ⚠️
git reset --hard HEAD~1

# Specific file unstage
git reset HEAD file.js
```

### Reflog (Time Machine)
```bash
# Git ki har action ki history
git reflog
# abc1234 HEAD@{0}: commit: feat: add test
# def5678 HEAD@{1}: checkout: moving from main to feature
# ...

# Accidentally deleted branch/commit recover karo
git checkout -b recovery HEAD@{5}
```

### Bisect (Bug Hunter)
```bash
# Binary search se bug-introducing commit dhundho
git bisect start
git bisect bad                 # Current commit bad hai
git bisect good abc123         # Yeh commit good tha
# Git automatically middle commit checkout karega
# Test karo → mark good or bad
git bisect good                # Ya: git bisect bad
# ... repeat until found
git bisect reset               # Finish
```

---

## 4️⃣ Collaboration

### Pull Requests Workflow
```bash
# 1. Main se branch banao
git checkout main && git pull
git checkout -b feature/add-login-test

# 2. Code likho, commit karo
git add . && git commit -m "feat: add login test"

# 3. Push karo
git push -u origin feature/add-login-test

# 4. GitHub/GitLab par Pull Request banao
# 5. Review, approve, merge

# 6. Cleanup
git checkout main && git pull
git branch -d feature/add-login-test
```

### Merge Conflict Resolution
```bash
# Conflict aaye toh:
git merge feature/branch
# CONFLICT in file.js

# 1. File open karo — conflict markers dikhenge:
# <<<<<<< HEAD (current)
# your code
# =======
# their code
# >>>>>>> feature/branch (incoming)

# 2. Manually resolve (markers hatao, sahi code rakho)
# 3. Stage resolved files
git add file.js
# 4. Commit
git commit -m "fix: resolve merge conflict in file.js"
```

---

## 5️⃣ Git Hooks (Automation)

```bash
# Install husky
npm install -D husky lint-staged
npx husky init

# Pre-commit hook — commit se pehle lint + format
# .husky/pre-commit
npx lint-staged

# Commit-msg hook — commit message validate
# .husky/commit-msg
npx commitlint --edit $1

# package.json mein:
# "lint-staged": {
#   "*.{js,ts}": ["eslint --fix", "prettier --write"],
#   "*.{json,md}": ["prettier --write"]
# }
```

### .gitignore Best Practices
```gitignore
# Dependencies
node_modules/

# Build output
dist/
build/

# IDE
.vscode/settings.json
.idea/

# Environment
.env
.env.local
.env.*.local

# OS
.DS_Store
Thumbs.db

# Test
test-results/
playwright-report/
coverage/
allure-results/

# Logs
*.log
npm-debug.log*
```

---

## 📋 Git Cheatsheet

| Command | Use |
|---------|-----|
| `git stash` | Temporarily save changes |
| `git rebase -i HEAD~3` | Squash last 3 commits |
| `git cherry-pick <hash>` | Copy specific commit |
| `git reset --soft HEAD~1` | Undo commit, keep changes staged |
| `git reflog` | View ALL git actions history |
| `git bisect` | Find bug-introducing commit |
| `git log --oneline --graph` | Visual branch history |
| `git diff --staged` | See what's being committed |
