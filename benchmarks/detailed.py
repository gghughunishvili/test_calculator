import asyncio
from playwright.async_api import async_playwright
import time
import os

async def run_benchmark():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        context = await browser.new_context()
        page = await context.new_page()

        file_path = "file://" + os.path.abspath("index.html")
        await page.goto(file_path)

        iterations = 5000

        # Benchmark 1: updateDisplay (DOM access)
        res1 = await page.evaluate(f"""() => {{
            const start = performance.now();
            for (let i = 0; i < {iterations}; i++) {{
                currentOperand = i.toString();
                updateDisplay();
            }}
            return performance.now() - start;
        }}""")
        print(f"updateDisplay (innerText + getElementById) x {iterations}: {res1:.2f}ms")

        # Benchmark 2: appendCharacter decimal check
        await page.evaluate("currentOperand = '1+2-3*4/5+(6*7)'.repeat(100)") # 14 * 100 = 1400 chars
        res2 = await page.evaluate(f"""() => {{
            const start = performance.now();
            const originalUpdate = updateDisplay;
            updateDisplay = () => {{}}; // bypass DOM for this test
            for (let i = 0; i < {iterations}; i++) {{
                appendCharacter('.');
            }}
            updateDisplay = originalUpdate;
            return performance.now() - start;
        }}""")
        print(f"appendCharacter (split/regex) x {iterations} on 1400 chars: {res2:.2f}ms")

        await browser.close()

if __name__ == "__main__":
    asyncio.run(run_benchmark())
