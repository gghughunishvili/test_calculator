## 2026-05-27 - DOM Access Optimization
**Learning:** In vanilla JS apps, repeated DOM lookups and use of 'innerText' can cause unnecessary layout reflows and overhead.
**Action:** Cache DOM element references in the global scope and prefer 'textContent' for measurable performance gains in UI-heavy updates.
