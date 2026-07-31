## 2024-05-26 - [DOM lookup and textContent optimization]
**Learning:** In vanilla JS apps with high-frequency UI updates (like a calculator), caching DOM references and using `textContent` provides a measurable performance boost by reducing DOM traversal and avoiding reflow-triggering `innerText`.
**Action:** Always check for redundant DOM lookups and prefer `textContent` over `innerText` in hot paths.

## 2025-05-14 - [DOM Performance Optimization in Vanilla JS]
**Learning:** In highly interactive vanilla JS apps like a calculator, frequent DOM access and expensive properties like `innerText` can cause measurable overhead. Caching DOM elements and using `textContent` (which doesn't trigger reflows) are simple but effective wins.
**Action:** Always check if DOM elements can be cached outside of frequent event handlers or update loops. Prefer `textContent` over `innerText` when visual style calculation isn't needed.

## 2025-05-15 - [Efficient Decimal Point Validation]
**Learning:** In string-processing scenarios like calculator input segment checks, using full string splits via regular expressions (e.g. `split(/[+\-*/()]/)`) on every character addition is highly inefficient due to array allocations and full regex scan overhead. A manual backward loop check of the current string buffer is significantly faster, scaling dramatically better for longer expressions.
**Action:** Avoid full string split or regex scan operations on frequent keyboard/input handlers when a simple backward scan can locate the segment boundary and check characteristics.
