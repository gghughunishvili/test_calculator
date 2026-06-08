import asyncio
import time
from playwright.async_api import async_playwright
import os

async def run_benchmark():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        context = await browser.new_context()
        page = await context.new_page()

        # Load the local HTML file
        path = os.path.abspath("index.html")
        await page.goto(f"file://{path}")

        print("--- Benchmarking updateDisplay ---")
        update_display_time = await page.evaluate("""
            () => {
                const start = performance.now();
                for (let i = 0; i < 10000; i++) {
                    currentOperand = '123.456';
                    previousOperand = '789 + ';
                    updateDisplay();
                }
                const end = performance.now();
                return end - start;
            }
        """)
        print(f"Time for 10,000 updateDisplay calls: {update_display_time:.2f} ms")

        print("--- Benchmarking appendCharacter (non-dot) ---")
        append_char_time = await page.evaluate("""
            () => {
                currentOperand = '';
                const start = performance.now();
                for (let i = 0; i < 1000; i++) {
                    appendCharacter('1');
                }
                const end = performance.now();
                return end - start;
            }
        """)
        print(f"Time for 1,000 appendCharacter('1') calls: {append_char_time:.2f} ms")

        print("--- Benchmarking appendCharacter (dot validation) ---")
        # Creating a long string to make the split more expensive
        await page.evaluate("currentOperand = '1+2-3*4/5+(6*7)-8+9'.repeat(100);")
        append_dot_time = await page.evaluate("""
            () => {
                const start = performance.now();
                for (let i = 0; i < 1000; i++) {
                    appendCharacter('.');
                }
                const end = performance.now();
                return end - start;
            }
        """)
        print(f"Time for 1,000 appendCharacter('.') calls with long string: {append_dot_time:.2f} ms")

        await browser.close()
        return update_display_time, append_char_time, append_dot_time

if __name__ == "__main__":
    asyncio.run(run_benchmark())
