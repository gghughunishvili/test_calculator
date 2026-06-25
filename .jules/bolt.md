## 2025-05-15 - DOM and String Processing Optimization
**Learning:** Found that using `split()` with regex for decimal point validation in long expressions causes unnecessary memory allocations. Additionally, using `innerText` triggers layout reflows which is more expensive than `textContent`. Lazy caching of DOM elements avoids redundant lookups.
**Action:** Always prefer `textContent` over `innerText` for simple text updates. Use `lastIndexOf` for efficient string segmenting in hot paths. Use lazy initialization for caching DOM elements to ensure the DOM is ready.
