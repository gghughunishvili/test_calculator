## 2025-05-15 - Decimal Validation Optimization
**Learning:** Using `split()` with a regular expression for decimal validation in a long expression string is a significant bottleneck due to repeated array allocations and string processing. `lastIndexOf` combined with `Math.max` and `slice` is ~80% faster for long strings.
**Action:** Prefer `lastIndexOf` or other non-allocating string search methods for character validation in high-frequency input handlers.

## 2025-05-15 - DOM Access in Update Loops
**Learning:** Frequent `document.getElementById` calls and `innerText` updates in a calculator's `updateDisplay` function can be optimized by caching element references and using `textContent` to avoid layout reflows. Lazy initialization ensures safety if the script is loaded before the DOM is fully parsed.
**Action:** Always cache DOM elements used in frequent updates and prefer `textContent` for plain text display.
