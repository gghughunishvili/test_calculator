## 2024-05-26 - [DOM lookup and textContent optimization]
**Learning:** In vanilla JS apps with high-frequency UI updates (like a calculator), caching DOM references and using `textContent` provides a measurable performance boost by reducing DOM traversal and avoiding reflow-triggering `innerText`.
**Action:** Always check for redundant DOM lookups and prefer `textContent` over `innerText` in hot paths.

## 2025-05-14 - [DOM Performance Optimization in Vanilla JS]
**Learning:** In highly interactive vanilla JS apps like a calculator, frequent DOM access and expensive properties like `innerText` can cause measurable overhead. Caching DOM elements and using `textContent` (which doesn't trigger reflows) are simple but effective wins.
**Action:** Always check if DOM elements can be cached outside of frequent event handlers or update loops. Prefer `textContent` over `innerText` when visual style calculation isn't needed.

## 2025-05-15 - [Decimal Point Validation Optimization via Backward Search]
**Learning:** Using global regex split (`currentOperand.split(/[+\-*/()]/)`) for segment boundary detection causes significant performance degradation as the expression grows, due to array allocation and string copying. Replacing it with a backward loop lookup avoids all array allocations and regex overhead, converting an O(N) operation to O(M) where M is only the length of the active number segment.
**Action:** Prefer manual backward character scans (like looking up to `lastIndexOf`) or reverse loops over complete string splitting and regex matching when only the last segment of a string is required.
