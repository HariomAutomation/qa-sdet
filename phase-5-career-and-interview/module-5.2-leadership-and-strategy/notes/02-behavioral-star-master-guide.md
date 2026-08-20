# 📘 Module 5.2 — SDET Leadership & Process

## Lesson 2: Behavioral STAR Master Guide (Top 5 High-Impact Model Answers)

---

## 🌟 Q1: Disagreement with Developer ("It works on my machine" / WontFix)
- **Situation**: *"A developer marked a critical checkout session timeout bug as 'Works on My Machine' because they tested on local low-latency Wi-Fi."*
- **Task**: *"I needed to prove the issue was reproducible under realistic 3G mobile network conditions without creating friction or hostility."*
- **Action**: *"Instead of arguing, I generated a Playwright Trace Viewer recording with 3G network throttling enabled and attached the HAR network log and video showing the exact race condition. Then I scheduled a brief 5-minute pairing session to demonstrate the trace together."*
- **Result**: *"The developer immediately understood the race condition, thanked me for the clear trace, and delivered a fix within 2 hours. We added a network throttling test to our automated regression suite to prevent regressions."*

---

## 🌟 Q2: Critical Bug Discovered 1 Hour Before Production Release
- **Situation**: *"During final pre-release automated smoke testing, our automated API suite caught a 500 error when processing international credit cards with 3D Secure verification."*
- **Task**: *"I had to make a data-backed go/no-go recommendation to the Release Manager and engineering VP."*
- **Action**: *"I immediately flagged a P0 release blocker in Slack, provided the exact payload causing the crash, and collaborated with the payment team to isolate the unhandled promise rejection. I also drafted a hotfix verification test script."*
- **Result**: *"Leadership postponed the deployment by 45 minutes, the hotfix was committed and verified with our automated test suite, preventing an estimated ₹15L loss in failed international transactions on day 1."*

---

## 🌟 Q3: Tight Sprint Deadlines & Balancing Automation vs Manual Testing
- **Situation**: *"In a 2-week sprint with heavy feature deliverables, Product Management requested testing 8 new features with zero dedicated time allocated for automation."*
- **Task**: *"Ensure high release quality without creating massive automation technical debt for future sprints."*
- **Action**: *"I introduced an In-Sprint Automation Matrix:
  1. High risk / Core P0 paths: Automated in-sprint as part of the Definition of Done (DoD).
  2. Low risk / Edge UI styling: Verified via fast exploratory testing.
  3. Created an automation backlog ticket for remaining P1/P2 regression coverage scheduled in the next sprint's buffer capacity."*
- **Result**: *"All 8 features shipped on time with zero production defects, and our core smoke automation suite maintained 95%+ coverage without sprint burnout."*
