## 2025-05-15 - Initial Profiling
**Learning:** The `updateDisplay` function performs redundant DOM lookups and uses `innerText`, which is slower than `textContent`. The `appendCharacter` function uses `split()` with a regex for decimal validation, which is inefficient for long strings.
**Action:** Implement DOM element caching and `textContent` in `updateDisplay`, or optimize the decimal validation logic.
