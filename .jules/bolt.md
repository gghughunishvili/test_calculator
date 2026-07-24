## 2024-05-26 - [DOM lookup and textContent optimization]
**Learning:** In vanilla JS apps with high-frequency UI updates (like a calculator), caching DOM references and using `textContent` provides a measurable performance boost by reducing DOM traversal and avoiding reflow-triggering `innerText`.
**Action:** Always check for redundant DOM lookups and prefer `textContent` over `innerText` in hot paths.

## 2025-05-14 - [DOM Performance Optimization in Vanilla JS]
**Learning:** In highly interactive vanilla JS apps like a calculator, frequent DOM access and expensive properties like `innerText` can cause measurable overhead. Caching DOM elements and using `textContent` (which doesn't trigger reflows) are simple but effective wins.
**Action:** Always check if DOM elements can be cached outside of frequent event handlers or update loops. Prefer `textContent` over `innerText` when visual style calculation isn't needed.

## 2025-05-15 - [Avoid Regex Splits in String Scanning]
**Learning:** Performing regex-based `.split()` operations on a hot path (such as every character append in decimal validation) allocates unnecessary arrays and multiple substring objects, causing up to 99% overhead on longer inputs. Replacing it with a backward `for` loop to scan only the last expression segment avoids all memory allocations and regex engine overhead.
**Action:** Scan strings backwards or use `lastIndexOf` instead of full regex-based splits when isolated segment properties are needed.
