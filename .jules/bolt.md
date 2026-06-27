## 2025-05-15 - DOM Access and String Processing Bottlenecks
**Learning:** In this calculator app, frequent UI updates triggered by `updateDisplay` were using redundant `getElementById` lookups and `innerText`, which is slower than `textContent`. Additionally, `appendCharacter` used an expensive regex `split` on the entire `currentOperand` for every decimal point validation.
**Action:** Use lazy initialization for caching DOM elements and prefer `lastIndexOf` over `split` for segmenting strings when only the last part is needed.
