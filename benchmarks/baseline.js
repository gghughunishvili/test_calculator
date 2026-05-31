
const { chromium } = require('playwright');
const fs = require('fs');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('file://' + process.cwd() + '/index.html');

  const benchmark = await page.evaluate(() => {
    const start = performance.now();
    for (let i = 0; i < 10000; i++) {
      appendCharacter('1');
      if (i % 10 === 0) calculateResult();
    }
    const end = performance.now();
    return end - start;
  });

  console.log(`Benchmark completed in ${benchmark.toFixed(2)}ms`);
  await browser.close();
})();
