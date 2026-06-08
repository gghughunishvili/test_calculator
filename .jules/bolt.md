## 2024-05-24 - DOM and String Optimization in Calculator

**Learning:** Caching DOM element references and switching from `innerText` to `textContent` significantly reduces UI update latency. Additionally, replacing regex-based `split()` with `lastIndexOf()` for string validation (like checking for existing decimal points) provides a massive performance boost, especially as the string length grows.

**Action:** Always check if frequent DOM updates can be optimized by caching lookups and using faster property accessors. Prefer targeted string search methods over full string splitting when only investigating the end of a sequence.
