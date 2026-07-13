## 2025-05-15 - Bottleneck in decimal validation
**Learning:** Using `split(/[+\-*/()]/)` to isolate the last numeric segment for decimal validation is an O(N) operation that allocates multiple strings. For long expressions, this becomes a measurable bottleneck.
**Action:** Use `Math.max` with `lastIndexOf` for various operators to efficiently find the start of the current segment without string allocations or full regex splitting.
