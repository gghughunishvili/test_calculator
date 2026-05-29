## 2025-05-22 - DOM Caching and textContent Optimization
**Learning:** In vanilla JS apps with frequent UI updates (like a calculator), caching DOM references and using `textContent` instead of `innerText` provides a measurable performance boost by reducing DOM traversals and avoiding layout reflows.
**Action:** Always identify frequently updated DOM elements and cache their references globally or in a persistent scope. Prefer `textContent` for raw text updates.
