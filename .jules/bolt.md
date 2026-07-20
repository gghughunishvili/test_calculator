## 2024-05-26 - [DOM lookup and textContent optimization]
**Learning:** In vanilla JS apps with high-frequency UI updates (like a calculator), caching DOM references and using `textContent` provides a measurable performance boost by reducing DOM traversal and avoiding reflow-triggering `innerText`.
**Action:** Always check for redundant DOM lookups and prefer `textContent` over `innerText` in hot paths.

## 2025-05-14 - [DOM Performance Optimization in Vanilla JS]
**Learning:** In highly interactive vanilla JS apps like a calculator, frequent DOM access and expensive properties like `innerText` can cause measurable overhead. Caching DOM elements and using `textContent` (which doesn't trigger reflows) are simple but effective wins.
**Action:** Always check if DOM elements can be cached outside of frequent event handlers or update loops. Prefer `textContent` over `innerText` when visual style calculation isn't needed.

## 2025-05-15 - [Avoid string split and array allocations in high-frequency validation loops]
**Learning:** Splitting a very long expression string by operators `currentOperand.split(/[+\-*/()]/)` to find the last segment creates short-lived arrays and substring allocations, leading to high garbage collection pressure and CPU overhead (O(N) complexity). A manual reverse loop identifying segment boundaries achieves O(M) complexity where M is the last segment's length.
**Action:** Prefer reverse loops or `lastIndexOf` when looking for the last segment of a string with multiple possible boundaries in hot paths.
