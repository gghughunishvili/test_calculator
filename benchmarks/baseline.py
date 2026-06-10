import asyncio
from playwright.async_api import async_playwright
import time
import os

async def run_benchmark():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        context = await browser.new_context()
        page = await context.new_page()

        # Load the local index.html
        file_path = "file://" + os.path.abspath("index.html")
        await page.goto(file_path)

        # Benchmark appendCharacter (which calls updateDisplay)
        # We'll do it 1000 times
        iterations = 1000

        start_time = await page.evaluate(f"""() => {{
            const start = performance.now();
            for (let i = 0; i < {iterations}; i++) {{
                appendCharacter('1');
            }}
            return start;
        }}""")

        end_time = await page.evaluate("() => performance.now()")

        duration = end_time - start_time
        print(f"Baseline: {iterations} appendCharacter calls took {duration:.2f}ms")

        # Benchmark appendCharacter with decimal check on long string
        # Clear first
        await page.evaluate("clearDisplay()")
        await page.evaluate("currentOperand = '1'.repeat(1000)")

        start_time_dec = await page.evaluate(f"""() => {{
            const start = performance.now();
            for (let i = 0; i < {iterations}; i++) {{
                appendCharacter('.');
            }}
            return start;
        }}""")
        end_time_dec = await page.evaluate("() => performance.now()")
        duration_dec = end_time_dec - start_time_dec
        print(f"Baseline (decimal check on long input): {iterations} '.' calls took {duration_dec:.2f}ms")

        await browser.close()

if __name__ == "__main__":
    asyncio.run(run_benchmark())
