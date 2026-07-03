## 2025-05-15 - DOM Access and String Processing Optimization
**Learning:** In a simple vanilla JS app, repeated DOM lookups and expensive string operations (like `split` on every character append) are the primary bottlenecks. Caching DOM references and using `lastIndexOf` for targeted string segment analysis provides significant performance gains without sacrificing readability.
**Action:** Always check for redundant DOM queries in update functions and prefer `lastIndexOf`/`slice` over `split`/`regex` for simple string segment validation.
