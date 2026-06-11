## 2025-05-14 - Optimized DOM updates and input validation
**Learning:** Caching DOM elements and using `textContent` instead of `innerText` significantly reduces overhead, especially when updates are frequent. Replacing expensive `split()` and regex operations with `lastIndexOf()` for input validation provides a massive performance boost for long input strings.
**Action:** Always look for redundant DOM lookups and expensive string operations in hot paths like input handling and display updates.
