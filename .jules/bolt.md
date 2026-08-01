## 2024-05-26 - [DOM lookup and textContent optimization]
**Learning:** In vanilla JS apps with high-frequency UI updates (like a calculator), caching DOM references and using `textContent` provides a measurable performance boost by reducing DOM traversal and avoiding reflow-triggering `innerText`.
**Action:** Always check for redundant DOM lookups and prefer `textContent` over `innerText` in hot paths.

## 2025-05-14 - [DOM Performance Optimization in Vanilla JS]
**Learning:** In highly interactive vanilla JS apps like a calculator, frequent DOM access and expensive properties like `innerText` can cause measurable overhead. Caching DOM elements and using `textContent` (which doesn't trigger reflows) are simple but effective wins.
**Action:** Always check if DOM elements can be cached outside of frequent event handlers or update loops. Prefer `textContent` over `innerText` when visual style calculation isn't needed.

## 2025-05-15 - [Efficient Decimal Isolation via Manual Backward Scan]
**Learning:** Parsing expression segments to enforce single-decimal validation using regular expression splits (e.g., `split(/[+\-*/()]/)`) allocates temporary arrays and does redundant scans. A manual backward loop provides an 84%+ micro-benchmark speedup by halting early on any segment boundary or decimal.
**Action:** Replace high-frequency string splitting with precise reverse scan loops when isolating the most recent sequence segment.
