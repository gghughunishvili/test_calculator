## 2025-05-15 - DOM and String Processing Bottlenecks
**Learning:** Using `split()` with a regular expression for string validation in frequently called functions like `appendCharacter` can lead to significant overhead due to object allocation and regex execution, especially as the string grows. Additionally, repeated `document.getElementById` calls and `innerText` usage in `updateDisplay` are minor but preventable bottlenecks.
**Action:** Prefer `lastIndexOf` and `Math.max` for isolating string segments. Cache DOM elements and use `textContent` to minimize layout reflows and lookup costs.
