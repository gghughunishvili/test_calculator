import time
from playwright.sync_api import sync_playwright

def run_benchmark():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context()
        page = context.new_page()

        # Load the local index.html
        import os
        path = os.path.abspath("index.html")
        page.goto(f"file://{path}")

        # Benchmark updateDisplay
        benchmark_script = """
        const iterations = 10000;
        const start = performance.now();
        for (let i = 0; i < iterations; i++) {
            currentOperand = '12345.6789';
            previousOperand = '98765.4321 +';
            updateDisplay();
        }
        const end = performance.now();
        (end - start).toFixed(4);
        """

        results = []
        for _ in range(5):
            duration = page.evaluate(benchmark_script)
            results.append(float(duration))
            # Reset operands for next run
            page.evaluate("currentOperand = ''; previousOperand = ''; updateDisplay();")

        avg_duration = sum(results) / len(results)
        print(f"Average duration for 10,000 updateDisplay calls: {avg_duration}ms")
        browser.close()

if __name__ == "__main__":
    run_benchmark()
