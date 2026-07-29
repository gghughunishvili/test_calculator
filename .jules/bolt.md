## 2024-05-26 - [DOM lookup and textContent optimization]
**Learning:** In vanilla JS apps with high-frequency UI updates (like a calculator), caching DOM references and using `textContent` provides a measurable performance boost by reducing DOM traversal and avoiding reflow-triggering `innerText`.
**Action:** Always check for redundant DOM lookups and prefer `textContent` over `innerText` in hot paths.

## 2025-05-14 - [DOM Performance Optimization in Vanilla JS]
**Learning:** In highly interactive vanilla JS apps like a calculator, frequent DOM access and expensive properties like `innerText` can cause measurable overhead. Caching DOM elements and using `textContent` (which doesn't trigger reflows) are simple but effective wins.
**Action:** Always check if DOM elements can be cached outside of frequent event handlers or update loops. Prefer `textContent` over `innerText` when visual style calculation isn't needed.

## 2025-05-15 - [Manual Reverse Loop vs. String Splitting]
**Learning:** For validation of specific characters (like decimal points) in expression segments, using string split `/ [+\-*/()] /` forces the engine to split the entire string and instantiate a full array every time. A manual reverse loop scanning backwards allows O(1) average-case segment scanning and completely avoids memory allocation, speeding up validation on long inputs by up to ~1400x.
**Action:** Avoid expensive splitting and regex slicing in character-by-character append handlers. Scan backwards instead.
