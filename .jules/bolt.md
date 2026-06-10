## 2025-05-15 - DOM and String Optimization
**Learning:** Caching DOM elements and using `textContent` instead of `innerText` provides a significant performance boost in high-frequency update functions like `updateDisplay`. Additionally, using `lastIndexOf` instead of `split` for character validation in strings avoids unnecessary allocations and is much more efficient for long inputs.
**Action:** Always prefer `textContent` for simple text updates and avoid array-creating string methods in hot paths when a simple search suffices.
