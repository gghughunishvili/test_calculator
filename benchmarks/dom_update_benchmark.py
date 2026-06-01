import time
from playwright.sync_api import sync_playwright
import os

def run_benchmark():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context()
        page = context.new_page()

        # Load the local index.html
        file_path = "file://" + os.path.abspath("index.html")
        page.goto(file_path)

        # Benchmark script
        benchmark_script = """
        () => {
            const start = performance.now();
            for (let i = 0; i < 10000; i++) {
                currentOperand = '123.456' + i;
                previousOperand = '987.654' + i;
                updateDisplay();
            }
            const end = performance.now();
            return end - start;
        }
        """

        results = []
        for _ in range(5):
            duration = page.evaluate(benchmark_script)
            results.append(duration)
            # Reset operands for next run if needed, though they are being overwritten

        avg_duration = sum(results) / len(results)
        print(f"Average duration over 5 runs: {avg_duration:.2f} ms")

        browser.close()

if __name__ == "__main__":
    run_benchmark()
