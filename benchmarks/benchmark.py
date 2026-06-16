import asyncio
from playwright.async_api import async_playwright
import time
import os

async def run_benchmark():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        context = await browser.new_context()
        page = await context.new_page()

        file_path = f"file://{os.getcwd()}/index.html"
        await page.goto(file_path)

        iterations = 5000

        results = await page.evaluate(f"""
            () => {{
                const start = performance.now();
                for (let i = 0; i < {iterations}; i++) {{
                    currentOperand = i.toString();
                    updateDisplay();
                }}
                const end = performance.now();
                const originalTime = end - start;

                // Simulate optimization
                const curr = document.getElementById('current-operand');
                const prev = document.getElementById('previous-operand');
                const startOpt = performance.now();
                for (let i = 0; i < {iterations}; i++) {{
                    currentOperand = i.toString();
                    curr.textContent = currentOperand || '0';
                    prev.textContent = previousOperand;
                }}
                const endOpt = performance.now();
                const optimizedTime = endOpt - startOpt;

                return {{ originalTime, optimizedTime }};
            }}
        """)

        print(f"Original updateDisplay ({iterations} iterations): {results['originalTime']:.4f} ms")
        print(f"Optimized updateDisplay ({iterations} iterations): {results['optimizedTime']:.4f} ms")
        print(f"Improvement: {((results['originalTime'] - results['optimizedTime']) / results['originalTime'] * 100):.2f}%")

        await browser.close()

if __name__ == "__main__":
    asyncio.run(run_benchmark())
