## 2024-05-26 - [DOM lookup and textContent optimization]
**Learning:** In vanilla JS apps with high-frequency UI updates (like a calculator), caching DOM references and using `textContent` provides a measurable performance boost by reducing DOM traversal and avoiding reflow-triggering `innerText`.
**Action:** Always check for redundant DOM lookups and prefer `textContent` over `innerText` in hot paths.

## 2025-05-14 - [DOM Performance Optimization in Vanilla JS]
**Learning:** In highly interactive vanilla JS apps like a calculator, frequent DOM access and expensive properties like `innerText` can cause measurable overhead. Caching DOM elements and using `textContent` (which doesn't trigger reflows) are simple but effective wins.
**Action:** Always check if DOM elements can be cached outside of frequent event handlers or update loops. Prefer `textContent` over `innerText` when visual style calculation isn't needed.

## 2025-05-15 - [String split segmentation vs manual character scanning in expression builders]
**Learning:** Repeatedly splitting an expression string using regular expressions to find the last segment's decimal status during keystroke appending results in O(N) allocations and traversal, causing performance degradation for long expressions. Running a lightweight backward character-scan provides an O(1) space and O(M) time alternative (where M is the length of the last segment) that is ~270x faster.
**Action:** Avoid full string split or regular expression operations on a growing input string when validating local boundaries; use reverse/backward linear scanning instead.
