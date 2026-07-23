## 2024-05-26 - [DOM lookup and textContent optimization]
**Learning:** In vanilla JS apps with high-frequency UI updates (like a calculator), caching DOM references and using `textContent` provides a measurable performance boost by reducing DOM traversal and avoiding reflow-triggering `innerText`.
**Action:** Always check for redundant DOM lookups and prefer `textContent` over `innerText` in hot paths.

## 2025-05-14 - [DOM Performance Optimization in Vanilla JS]
**Learning:** In highly interactive vanilla JS apps like a calculator, frequent DOM access and expensive properties like `innerText` can cause measurable overhead. Caching DOM elements and using `textContent` (which doesn't trigger reflows) are simple but effective wins.
**Action:** Always check if DOM elements can be cached outside of frequent event handlers or update loops. Prefer `textContent` over `innerText` when visual style calculation isn't needed.

## 2025-05-15 - [Efficient Decimal Isolation via Backward Scanning]
**Learning:** Relying on regular expressions and `split()` to isolate the current numeric segment for decimal validation causes O(N) memory and time overhead on every button press. A manual reverse-loop scan is O(1) in space and O(M) in time (where M is the last segment length), making it ~3200x faster on long expressions.
**Action:** Avoid full string splitting and regex execution in active user input paths; use targeted reverse-iteration loops for segment isolation.
