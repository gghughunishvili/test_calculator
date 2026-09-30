## 2024-05-26 - [DOM lookup and textContent optimization]
**Learning:** In vanilla JS apps with high-frequency UI updates (like a calculator), caching DOM references and using `textContent` provides a measurable performance boost by reducing DOM traversal and avoiding reflow-triggering `innerText`.
**Action:** Always check for redundant DOM lookups and prefer `textContent` over `innerText` in hot paths.

## 2025-05-14 - [DOM Performance Optimization in Vanilla JS]
**Learning:** In highly interactive vanilla JS apps like a calculator, frequent DOM access and expensive properties like `innerText` can cause measurable overhead. Caching DOM elements and using `textContent` (which doesn't trigger reflows) are simple but effective wins.
**Action:** Always check if DOM elements can be cached outside of frequent event handlers or update loops. Prefer `textContent` over `innerText` when visual style calculation isn't needed.

## 2025-05-15 - [Decimal Point Validation optimization via Reverse Loop]
**Learning:** String splitting (`split(/[+\-*/()]/)`) creates multiple temporary substrings and array structures, generating significant garbage collection and execution overhead on frequent operations. A manual reverse loop over the string from the end terminates early and avoids any memory allocation.
**Action:** Use a manual reverse loop starting from the end of the string to find segment boundaries instead of splitting the entire string with regular expressions.
