## 2026-05-28 - [DOM Performance in Vanilla JS]
**Learning:** Even in simple applications, repeated DOM lookups using `getElementById` and using `innerText` (which triggers layout reflows) can be significantly slower than cached references and `textContent`.
**Action:** Always cache DOM element references in the global scope when they are frequently updated and prefer `textContent` over `innerText` for better performance.
