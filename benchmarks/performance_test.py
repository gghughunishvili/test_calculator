import asyncio
import time
import os
from playwright.async_api import async_playwright

async def run_benchmark():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        context = await browser.new_context()
        page = await context.new_page()

        # Get absolute path to index.html
        file_path = f"file://{os.path.abspath('index.html')}"
        await page.goto(file_path)

        # Benchmark updateDisplay
        iterations = 1000

        # We need to make sure updateDisplay is available
        # It's defined in script.js which is loaded in index.html

        start_time = await page.evaluate(f"""() => {{
            const start = performance.now();
            for (let i = 0; i < {iterations}; i++) {{
                currentOperand = 'Iteration ' + i;
                previousOperand = 'Prev ' + i;
                updateDisplay();
            }}
            return start;
        }}""")

        end_time = await page.evaluate("performance.now()")

        duration = end_time - start_time
        print(f"Benchmark: {iterations} iterations took {duration:.2f}ms")
        print(f"Average time per call: {(duration/iterations):.4f}ms")

        await browser.close()

if __name__ == "__main__":
    asyncio.run(run_benchmark())
