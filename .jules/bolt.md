## 2024-05-24 - Optimizing frequent UI updates by caching DOM lookups and using textContent

**Learning:** Repeatedly calling `document.getElementById` in high-frequency functions like `updateDisplay` is a significant performance bottleneck. In this environment, caching these lookups resulted in a ~59x performance improvement (from 118ms down to 2ms for 10,000 iterations). Additionally, `textContent` is faster than `innerText` as it doesn't trigger expensive layout reflows to determine visibility.

**Action:** Always cache DOM element references at the top level or in a persistent scope if they are accessed frequently (e.g., in event handlers or update loops). Prefer `textContent` for updating plain text to minimize browser overhead.
