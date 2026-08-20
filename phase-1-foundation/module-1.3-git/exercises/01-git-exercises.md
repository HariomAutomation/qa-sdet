# 📘 Module 1.3 — Git Exercises

## Exercise 1: Git Simulation — Practice These Commands

> Yeh exercises terminal mein practice karo. Ek test repo banao aur commands try karo.

### Setup — Practice Repo
```bash
mkdir git-practice && cd git-practice
git init
echo "# Git Practice" > README.md
git add . && git commit -m "initial: add README"
```

### Exercise 1.1: Branching & Merging
```bash
# TODO:
# 1. "feature/add-tests" branch banao
# 2. Ek file banao: tests/login.test.js (kuch bhi content likho)
# 3. Commit karo: "feat: add login test"
# 4. Ek aur file: tests/signup.test.js
# 5. Commit karo: "feat: add signup test"
# 6. main par wapas jao
# 7. Merge karo feature branch
# 8. Feature branch delete karo
```

### Exercise 1.2: Rebase Practice
```bash
# TODO:
# 1. "feature/api-tests" branch banao
# 2. 3 commits karo (3 alag files banao)
# 3. main par jao, koi aur file banao aur commit karo
# 4. feature branch par wapas jao
# 5. Rebase karo main par: git rebase main
# 6. Interactive rebase se 3 commits ko squash karo: git rebase -i HEAD~3
```

### Exercise 1.3: Conflict Resolution
```bash
# TODO:
# 1. main par ek file banao: config.js (content: port = 3000)
# 2. "feature/change-port" branch banao, config.js mein port = 8080 karo, commit
# 3. main par wapas jao, config.js mein port = 4000 karo, commit
# 4. Merge karo feature branch → CONFLICT aayega!
# 5. Conflict resolve karo manually
# 6. Commit karo
```

### Exercise 1.4: Stash Practice
```bash
# TODO:
# 1. Kuch changes karo (commit mat karo)
# 2. git stash save "WIP: login changes"
# 3. Aur changes karo, stash karo: "WIP: signup changes"
# 4. git stash list se dekho
# 5. Pehla stash apply karo
# 6. Dusra stash pop karo
```

### Exercise 1.5: Git Log Investigation
```bash
# TODO: In questions ka answer dhundho git log se:
# 1. Last 5 commits ka one-liner
# 2. Specific file ki history
# 3. Graph view mein branches dekho
# 4. Date range mein commits (--since="2 days ago")
# 5. Specific author ke commits
```

### Exercise 1.6: Cherry-Pick
```bash
# TODO:
# 1. "experiment" branch banao, 3 commits karo
# 2. main par wapas jao
# 3. Sirf 2nd commit cherry-pick karo main mein
# 4. Verify karo ki sirf 2nd commit ki changes aayi
```

### Exercise 1.7: Reset & Recovery
```bash
# TODO:
# 1. 3 commits karo
# 2. git reset --soft HEAD~1 (last commit undo, changes staged)
# 3. git reset HEAD~1 (ek aur undo, changes unstaged)
# 4. git reflog se purane commits dekho
# 5. git reset --hard <hash> se wapas jao
```

---

## 📋 Verification Checklist
After completing exercises, verify you can:
- [ ] Branch create, switch, merge, delete
- [ ] Rebase aur squash commits
- [ ] Merge conflicts resolve
- [ ] Stash save, list, apply, pop
- [ ] Cherry-pick specific commits
- [ ] Reset (soft, mixed, hard) samajhna
- [ ] Reflog se recovery karna
