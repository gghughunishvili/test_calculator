## 2024-05-26 - [DOM lookup and textContent optimization]
**Learning:** In vanilla JS apps with high-frequency UI updates (like a calculator), caching DOM references and using `textContent` provides a measurable performance boost by reducing DOM traversal and avoiding reflow-triggering `innerText`.
**Action:** Always check for redundant DOM lookups and prefer `textContent` over `innerText` in hot paths.

## 2025-05-14 - [DOM Performance Optimization in Vanilla JS]
**Learning:** In highly interactive vanilla JS apps like a calculator, frequent DOM access and expensive properties like `innerText` can cause measurable overhead. Caching DOM elements and using `textContent` (which doesn't trigger reflows) are simple but effective wins.
**Action:** Always check if DOM elements can be cached outside of frequent event handlers or update loops. Prefer `textContent` over `innerText` when visual style calculation isn't needed.

## 2025-07-30 - [Array splitting vs Manual Loop for string parsing]
**Learning:** In string parsing or search checks on potentially large segments (e.g., checking if the last segment has a decimal point), using `split()` with regular expressions generates high overhead due to array allocation and regex matching. A manual reverse-scanning loop reduces complexity to O(1) average-case and avoids allocations entirely.
**Action:** Use manual reverse loops or pointer indices when inspecting the final segment of strings instead of split-and-array-slice patterns.
