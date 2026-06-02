import os
from playwright.sync_api import sync_playwright

def run_benchmark():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        # Using file protocol to access the local file
        path = os.path.abspath("index.html")
        page = browser.new_page()
        page.goto(f"file://{path}")

        # Number of iterations
        iterations = 20000

        # Run benchmark
        # We use page.evaluate to run the loop inside the browser context
        duration = page.evaluate(f"""
            () => {{
                const start = performance.now();
                for (let i = 0; i < {iterations}; i++) {{
                    currentOperand = i.toString();
                    previousOperand = (i-1).toString();
                    updateDisplay();
                }}
                return performance.now() - start;
            }}
        """)

        browser.close()
        return duration

if __name__ == "__main__":
    runs = 10
    results = []
    print(f"Running benchmark with 20000 iterations, 10 runs...")
    for i in range(runs):
        res = run_benchmark()
        results.append(res)
        print(f"Run {i+1}: {res:.2f}ms")

    # Exclude first run (warmup)
    stable_results = results[1:]
    avg = sum(stable_results) / len(stable_results)
    print(f"Average time (excluding warmup): {avg:.2f}ms")
