## 2025-05-14 - [DOM Performance Optimization in Vanilla JS]
**Learning:** In highly interactive vanilla JS apps like a calculator, frequent DOM access and expensive properties like `innerText` can cause measurable overhead. Caching DOM elements and using `textContent` (which doesn't trigger reflows) are simple but effective wins.
**Action:** Always check if DOM elements can be cached outside of frequent event handlers or update loops. Prefer `textContent` over `innerText` when visual style calculation isn't needed.

## 2025-05-15 - [Efficient String Validation in Loops]
**Learning:** Using `split()` with a regular expression on a long string to validate a suffix or segment is extremely inefficient (O(N) memory and time for string/array allocations). A manual reverse loop can achieve the same result in O(1) extra space and early exit as soon as the segment boundary is found.
**Action:** When validating the current segment of an expression (like a calculator input), prefer manual iteration or `lastIndexOf` over `split()` to avoid unnecessary allocations.
