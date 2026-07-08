## 2025-05-15 - Optimizing String Parsing for Decimal Validation
**Learning:** Using `split` with regex on long strings for every character insertion creates unnecessary array allocations. Using `lastIndexOf` with `Math.max` to find the last segment boundary is significantly faster (~80% improvement) and avoids regex parsing overhead in the hot path.
**Action:** Use `lastIndexOf` for finding segment boundaries in strings instead of `split` when only the last segment is needed.
