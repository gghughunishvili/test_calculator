## 2026-06-29 - DOM Access and Segment Validation Optimizations
**Learning:** Frequent `document.getElementById` calls and `innerText` access can be bottlenecks in UI-heavy apps. `textContent` is a faster alternative as it avoids layout reflows. Additionally, using regex `split()` for validating segments in a long string is significantly slower than using `lastIndexOf()` and `slice()`.

**Action:** Always cache DOM element references when they are used frequently (like in a display update). Prefer `textContent` over `innerText` unless styling/layout awareness is strictly required. Use string search methods (`lastIndexOf`) instead of regex splits for simple segment isolation.
