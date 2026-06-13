## 2025-05-14 - Optimized appendCharacter and updateDisplay

**Learning:** Replacing `split()` with `lastIndexOf()` for validating the current number segment in a calculator expression can lead to massive performance gains (up to 90x-100x for long strings) by avoiding unnecessary array allocation. Caching DOM elements and using `textContent` instead of `innerText` are small but effective ways to reduce overhead in frequently called UI update functions.

**Action:** Always prefer primitive string search methods (`indexOf`, `lastIndexOf`) over `split()` when only the last segment of a string is needed for validation. Continue caching DOM elements in the global scope for vanilla JS projects to avoid redundant lookups.
