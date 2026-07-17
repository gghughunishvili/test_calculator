## 2025-05-14 - [DOM Performance Optimization in Vanilla JS]
**Learning:** In highly interactive vanilla JS apps like a calculator, frequent DOM access and expensive properties like `innerText` can cause measurable overhead. Caching DOM elements and using `textContent` (which doesn't trigger reflows) are simple but effective wins.
**Action:** Always check if DOM elements can be cached outside of frequent event handlers or update loops. Prefer `textContent` over `innerText` when visual style calculation isn't needed.

## 2025-05-15 - [O(N) to O(1)/O(M) Optimization via Reverse Loop]
**Learning:** Isolating the last segment of a mathematical expression using `split(/[+\-*/()]/)` results in an $O(N)$ runtime complexity and allocates multiple strings/arrays on every numeric/decimal input. This grows exponentially worse with expression size. Traversing the string backwards to the first operator allows $O(M)$ checking (where $M$ is only the length of the current segment) and avoids any memory allocation.
**Action:** Avoid regex splits on full strings for local, end-of-string lookups. Use a backward-scanning manual loop or `lastIndexOf` pattern to find segment boundaries efficiently.
