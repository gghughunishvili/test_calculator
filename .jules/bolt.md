## 2025-05-15 - Type Safety in String Optimizations
**Learning:** When optimizing string operations (like `split` to `lastIndexOf`), always ensure the target variable is actually a string. In this calculator, `calculateResult` can update `currentOperand` to a value that might be treated as a number in some contexts or future changes, even if currently cast to string. Removing "redundant" `.toString()` calls can lead to `TypeError` if the assumption of string type is violated.
**Action:** Always include defensive `.toString()` calls when performing string-specific methods on variables that might hold numeric results from evaluations.

## 2025-05-15 - DOM Caching and textContent
**Learning:** Caching DOM elements and switching from `innerText` to `textContent` provides a significant performance boost in applications with frequent UI updates (like a calculator) by reducing DOM lookups and avoiding expensive layout reflows.
**Action:** Apply DOM caching for elements updated on every keystroke and prefer `textContent` for plain text updates.
