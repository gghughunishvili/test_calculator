## 2025-05-15 - Optimized Input Processing and DOM Updates

**Learning:** Replacing `split()` and `includes()` with `lastIndexOf()` and `slice()` for decimal point validation significantly reduces array allocation and processing time, especially as the expression grows. Caching DOM elements and using `textContent` instead of `innerText` follow best practices for minimizing reflows and redundant lookups, although micro-benchmarking mock objects in Node.js might not show the full benefit of avoiding browser reflows.

**Action:** Always check if a complex string operation (like splitting by multiple delimiters) can be replaced with targeted index lookups when only the last segment is needed. Prefer `textContent` for non-HTML updates to avoid the performance cost of `innerText`.
