import time
from playwright.sync_api import sync_playwright
import os

def run_benchmark():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        # Using absolute path for the file
        file_path = "file://" + os.path.abspath("index.html")
        page = browser.new_page()
        page.goto(file_path)

        # Benchmark 10,000 updates
        iterations = 10000

        start_time = page.evaluate("""
            (iterations) => {
                const start = performance.now();
                for (let i = 0; i < iterations; i++) {
                    currentOperand = '123.45';
                    previousOperand = '987.65 +';
                    updateDisplay();
                }
                const end = performance.now();
                return end - start;
            }
        """, iterations)

        print(f"Time for {iterations} updates: {start_time:.2f} ms")
        print(f"Average time per update: {(start_time / iterations) * 1000:.4f} microseconds")

        browser.close()
        return start_time

if __name__ == "__main__":
    # Run it a few times to get a stable average
    results = []
    for i in range(3):
        print(f"Run {i+1}...")
        results.append(run_benchmark())

    avg = sum(results) / len(results)
    print(f"\nAverage time over 3 runs: {avg:.2f} ms")
