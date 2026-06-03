## 2025-05-15 - DOM Update Optimization
**Learning:** Even in a small-scale vanilla JS application, caching DOM elements and using `textContent` instead of `innerText` provides a measurable performance boost (>50% speedup in bulk updates). `innerText` is more expensive because it triggers a layout reflow to account for styles, while `textContent` only manipulates the raw text in the DOM tree.
**Action:** Always cache frequently accessed DOM elements in the global scope (or a constructor/init function) and prefer `textContent` for plain text updates to minimize browser overhead.
