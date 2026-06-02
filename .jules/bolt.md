## 2025-05-15 - DOM update optimization
**Learning:** Caching DOM elements and using `textContent` instead of `innerText` provides a measurable speedup in UI update loops. In this calculator app, it reduced the time for 20,000 updates from ~31.9ms to ~26.2ms (approx 18% improvement).
**Action:** Always cache DOM references for elements that are updated frequently. Prefer `textContent` over `innerText` unless styling/layout awareness is explicitly required.
