## 2025-05-15 - DOM Interaction Optimization
**Learning:** In a simple vanilla JS app, repeated `getElementById` lookups and `innerText` assignments in frequent update loops (like every keypress in a calculator) are measurable bottlenecks. `textContent` is significantly faster than `innerText` because it bypasses layout calculations.
**Action:** Always cache frequently accessed DOM elements and prefer `textContent` for simple text updates.
