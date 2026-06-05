## 2025-05-15 - DOM Caching and TextContent Optimization
**Learning:** In simple vanilla JS apps, repeated DOM lookups (`getElementById`) and using `innerText` (which triggers layout reflows) are common bottlenecks. Caching elements and switching to `textContent` provided a measurable ~22.8% speedup even in a headless environment.
**Action:** Always cache frequently accessed DOM elements and prefer `textContent` for pure text updates.

## 2025-05-15 - Avoiding Array Allocation in Hot Paths
**Learning:** String `split()` with regex creates temporary arrays that need garbage collection. For simple validation like finding the last number segment in a calculator, `lastIndexOf` is more efficient.
**Action:** Use string search methods instead of `split` for single-character or simple boundary detection in performance-sensitive input handling.
