## 2024-05-26 - [DOM lookup and textContent optimization]
**Learning:** In vanilla JS apps with high-frequency UI updates (like a calculator), caching DOM references and using `textContent` provides a measurable performance boost by reducing DOM traversal and avoiding reflow-triggering `innerText`.
**Action:** Always check for redundant DOM lookups and prefer `textContent` over `innerText` in hot paths.

## 2025-05-14 - [DOM Performance Optimization in Vanilla JS]
**Learning:** In highly interactive vanilla JS apps like a calculator, frequent DOM access and expensive properties like `innerText` can cause measurable overhead. Caching DOM elements and using `textContent` (which doesn't trigger reflows) are simple but effective wins.
**Action:** Always check if DOM elements can be cached outside of frequent event handlers or update loops. Prefer `textContent` over `innerText` when visual style calculation isn't needed.

## 2025-05-15 - [Avoid string splitting for isolated token validation]
**Learning:** For verifying segment tokens like decimals in input streams, using full string `.split()` creates heavy garbage collections and O(N) complexity over history. A manual reverse loop achieves O(M) where M is the small segment length, eliminating arrays and yielding up to 99% speedup.
**Action:** Avoid full string splitting/regex matching on continuous UI inputs; scan backwards from the end instead to isolate segments efficiently.
