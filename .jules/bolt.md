## 2025-05-14 - [DOM Performance Optimization in Vanilla JS]
**Learning:** In highly interactive vanilla JS apps like a calculator, frequent DOM access and expensive properties like `innerText` can cause measurable overhead. Caching DOM elements and using `textContent` (which doesn't trigger reflows) are simple but effective wins.
**Action:** Always check if DOM elements can be cached outside of frequent event handlers or update loops. Prefer `textContent` over `innerText` when visual style calculation isn't needed.

## 2025-05-15 - [Efficient Segment Validation in Strings]
**Learning:** For a calculator, validating the current number segment (e.g., checking for existing decimal points) using `split(/[operators]/)` is extremely inefficient for long expressions because it creates new arrays and strings on every character input. A manual reverse loop is significantly faster (~99% for 10k chars) as it stops at the first segment boundary and avoids allocations.
**Action:** Use reverse loops for validating the "tail" of a string against a set of delimiters instead of splitting the entire string.
