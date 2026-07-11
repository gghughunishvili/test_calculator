## 2025-05-15 - lastIndexOf is faster than split() for segment isolation
**Learning:** Using `split()` with a regular expression to isolate the last segment of an expression string (e.g., to validate decimal points) is approximately 10x slower than using `lastIndexOf`. `split()` creates multiple intermediate strings and an array, whereas `lastIndexOf` combined with `slice()` (or just checking the isolated segment) avoids this overhead.
**Action:** Use `lastIndexOf` or other non-allocating string search methods for simple segment isolation in performance-critical paths like input handling.
