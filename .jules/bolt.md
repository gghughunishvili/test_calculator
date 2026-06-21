## 2025-05-15 - Calculator Input & Display Optimizations
**Learning:** For high-frequency UI updates like a calculator display, caching DOM element references and using `textContent` instead of `innerText` (which avoids layout reflows) significantly reduces main-thread work. Additionally, using `lastIndexOf` for string segment analysis is much more efficient than `split()` with regular expressions, especially as the input expression grows.

**Action:** Always cache DOM elements in the global scope if they are accessed on every user interaction, and prefer `lastIndexOf` over `split` when looking for the last occurrence of specific characters in a string.
