# Bolt's Performance Journal

## 2025-05-15 - Initial Assessment
**Learning:** The calculator app uses frequent DOM lookups in `updateDisplay` and expensive string splitting in `appendCharacter`. No `package.json` exists, so manual benchmarking and Playwright are needed for verification.
**Action:** Use Playwright to benchmark DOM operations and Node.js for logic-only benchmarks.

## 2025-05-15 - Performance Baseline
**Learning:**
- `appendCharacter` logic (splitting 17k char string): ~0.5ms per call (5.4s / 10k).
- `updateDisplay`: ~0.0054ms per call in Playwright.
**Action:** Optimize `appendCharacter` using `lastIndexOf` and cache DOM elements in `updateDisplay`.

## 2025-05-15 - Post-Optimization Results
**Learning:**
- `appendCharacter` optimized: ~0.00057ms per call (5.7ms / 10k). A **~99% improvement** for long strings.
- `updateDisplay` optimized: ~0.0016ms per call. A **~70% improvement**.
**Action:** Always prefer `lastIndexOf` over `split` for segment isolation in strings. Use `textContent` and cache DOM elements for frequently updated UI.
