## 2025-05-15 - Decimal Validation Optimization
**Learning:** Using `split(/[+\-*/()]/)` to find the last numeric segment in an expression string is extremely inefficient as the expression grows, due to the creation of many intermediate string and array objects. `lastIndexOf` combined with `Math.max` and `includes` with a start index is ~80-90% faster for long expressions.
**Action:** Prefer `lastIndexOf` or `indexOf` with start/end indices for segmenting strings based on single-character delimiters in performance-critical paths.
