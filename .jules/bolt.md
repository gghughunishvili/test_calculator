## 2025-05-15 - DOM Caching and String Optimization
**Learning:** Even in a small application like a calculator, hot paths (like input handling) can benefit significantly from avoiding object allocations (like `split` creating arrays) and layout-triggering properties (like `innerText`).
**Action:** Always prefer `textContent` for simple text updates and `lastIndexOf` for searching from the end of strings in sequence-heavy logic.

## 2025-05-15 - Unicode Operator Support
**Learning:** When optimizing string search logic that depends on operators, standard ASCII symbols (+, -, *, /) may not be enough if the UI or data uses Unicode equivalents (÷, ×, −).
**Action:** Ensure all possible operator representations are accounted for when isolating numeric segments in calculator-like apps.
