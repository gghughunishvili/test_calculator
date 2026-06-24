## 2025-05-22 - DOM and String Optimizations in Calculator
**Learning:** Using `textContent` instead of `innerText` and lazy caching of DOM elements significantly reduces the overhead of frequent display updates. Additionally, using `lastIndexOf` instead of `split()` with regex for segment validation avoids unnecessary array allocations, which is critical for performance as the expression string grows.
**Action:** Always prefer `textContent` for simple text updates and `lastIndexOf` for searching in long strings when regex/splitting is not strictly required.
