## 2025-05-15 - DOM Access Optimization
**Learning:** In vanilla JS, caching DOM elements and using `textContent` instead of `innerText` provides a significant performance boost in frequently called update functions. Benchmark showed ~67.5% improvement in display update duration.
**Action:** Always cache DOM element references outside of hot loops/functions and prefer `textContent` when no CSS-aware text retrieval is needed.
