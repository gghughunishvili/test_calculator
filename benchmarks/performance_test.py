import time
from playwright.sync_api import sync_playwright
import os

def run_benchmark():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context()
        page = context.new_page()

        file_path = "file://" + os.path.abspath("index.html")
        page.goto(file_path)

        iterations = 10000

        # Benchmark updateDisplay specifically
        duration_update = page.evaluate(f"""
            (iterations) => {{
                const start = performance.now();
                for (let i = 0; i < iterations; i++) {{
                    updateDisplay();
                }}
                return performance.now() - start;
            }}
        """, iterations)
        print(f"Time for {iterations} updateDisplay calls: {duration_update:.4f} ms")

        # Benchmark appendCharacter decimal logic specifically (by mocking updateDisplay)
        page.evaluate("const originalUpdate = updateDisplay; updateDisplay = () => {};")

        # Long operand to make split expensive
        page.evaluate("currentOperand = '1+2-3*4/5+(6-7)'.repeat(100)")

        duration_decimal = page.evaluate(f"""
            (iterations) => {{
                const start = performance.now();
                for (let i = 0; i < iterations; i++) {{
                    appendCharacter('.');
                }}
                return performance.now() - start;
            }}
        """, iterations)
        print(f"Time for {iterations} decimal validation calls (logic only, long string): {duration_decimal:.4f} ms")

        browser.close()

if __name__ == "__main__":
    for i in range(3):
        print(f"Run {i+1}:")
        run_benchmark()
        print("-" * 20)
