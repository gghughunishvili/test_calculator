
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

        # Warm up
        await page.evaluate("""
            for (let i = 0; i < 100; i++) {
                appendCharacter('1');
                if (i % 10 === 0) calculateResult();
            }
            clearDisplay();
        """)

        start_time = time.time()

        iterations = 5000
        await page.evaluate(f"""
            for (let i = 0; i < {iterations}; i++) {{
                appendCharacter('1');
                appendCharacter('+');
                appendCharacter('1');
                calculateResult();
            }}
        """)

        end_time = time.time()
        duration = end_time - start_time
        print(f"Benchmark completed in {duration:.4f} seconds for {iterations} iterations")

        await browser.close()

if __name__ == "__main__":
    asyncio.run(run_benchmark())
